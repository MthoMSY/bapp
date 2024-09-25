import React, { useState } from "react";
import { Budget } from "../../types/budget";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAppToast } from "../../hooks/useAppToast";
import { useForm } from "react-hook-form";
import { updateUserBudget } from "../../features/budget/budgetSlice";
import Decimal from "decimal.js";

interface Props {
  budget: Budget;
  setShowModal: (show: boolean) => void;
  updateBudgets: () => void;
}

interface FormValues {
  name: string;
  description: string;
  limit: number;
}

export const EditBudgetModal: React.FC<Props> = ({
  budget,
  setShowModal,
  updateBudgets,
}) => {
  const [updateBudgetPending, setUpdateBudgetPending] = useState(false);

  const { success, error } = useAppToast();

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      name: budget.name,
      description: budget.description,
      limit: new Decimal(budget.limit.toString()).toNumber(), // check if we lose precision here
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;
  const onConfirm = (formValues: FormValues) => {
    setUpdateBudgetPending(true);
    dispatch(
      updateUserBudget({ token, payload: { ...formValues, id: budget.id } })
    )
      .unwrap()
      .then(() => {
        success(`Successfully added ${formValues.name} to your budget`);
        updateBudgets();
      })
      .catch(() => {
        error("Error adding item to your budget");
      })
      .finally(() => {
        setUpdateBudgetPending(false);
        setShowModal(false);
      });
  };

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Budget</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setShowModal(false)}
          ></button>
        </header>
        <section className="modal-card-body">
          <form id="editBudget" onSubmit={handleSubmit(onConfirm)}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  disabled={updateBudgetPending}
                  className="input"
                  type="text"
                  {...register("name", {
                    required: {
                      message: "Name for your budget is required",
                      value: true,
                    },
                    validate: {
                      minLength: (fieldValue: string) => {
                        return (
                          fieldValue.length > 2 ||
                          "Name of your item must be at least 3 characters"
                        );
                      },
                    },
                  })}
                  required
                />
              </div>
              <p className="help is-danger">{errors.name?.message}</p>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  disabled={updateBudgetPending}
                  className="textarea"
                  {...register("description", {
                    required: {
                      message: "Description for your budget is required",
                      value: true,
                    },
                    minLength: {
                      message:
                        "Description of your budget must be at least 3 characters",
                      value: 3,
                    },
                  })}
                ></textarea>
              </div>
            </div>
            <p className="help is-danger">{errors.description?.message}</p>
            <div className="field">
              <label className="label">Limit</label>
              <div className="control">
                <input
                  disabled={updateBudgetPending}
                  className="input"
                  type="number"
                  step="0.01"
                  {...register("limit", {
                    valueAsNumber: true,
                    validate: {
                      positive: (fieldValue: number) => {
                        return (
                          fieldValue >= 0 || "Negative limit is not allowed"
                        );
                      },
                    },
                  })}
                />
              </div>
            </div>
            <p className="help is-danger">{errors.limit?.message}</p>
          </form>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center">
          <div className="buttons">
            <button
              disabled={updateBudgetPending}
              className="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              disabled={!isValid}
              form="editBudget"
              type="submit"
              className={`button is-success ${
                updateBudgetPending ? "is-loading" : ""
              }`}
            >
              Save changes
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
