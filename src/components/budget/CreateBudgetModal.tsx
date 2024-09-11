import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createBudget } from "../../features/budget/budgetSlice";
import { useAppToast } from "../../hooks/useAppToast";
import { useState } from "react";
import { getIsLoadingClassName } from "../utils";

interface Props {
  setShowModal: (show: boolean) => void;
}

type FormValues = {
  name: string;
  description: string;
};

export function CreateBudgetModal(props: Props) {
  const { setShowModal } = props;
  const dispatch = useAppDispatch();
  const { success, error } = useAppToast();
  const { token } = useAppSelector((state) => state.user);

  const [createBudgetPending, setCreateBudgetPending] =
    useState<boolean>(false);
  const form = useForm<FormValues>({ mode: "all" });
  const { register, handleSubmit, formState } = form;
  const onConfirm = (formValues: FormValues) => {
    setCreateBudgetPending(true);
    dispatch(createBudget({ token, payload: formValues }))
      .unwrap()
      .then(() => {
        success(`Successfully added a new budget ${formValues.name}`);
      })
      .catch(() => {
        error("Error adding budget");
      })
      .finally(() => {
        setShowModal(false);
        setCreateBudgetPending(false);
      });
  };

  const { errors } = formState;
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="subtitle has-text-centered">
            <strong>Create Budget</strong>
          </h2>
          <form onSubmit={handleSubmit(onConfirm)}>
            <div className="field">
              <label className="label"></label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  id="budgetName"
                  {...register("name", {
                    required: {
                      message: "Name for your budget is required",
                      value: true,
                    },
                    validate: {
                      minLength: (fieldValue: string) => {
                        return (
                          fieldValue.length > 3 ||
                          "Name of your budget must be at least 3 characters"
                        );
                      },
                    },
                  })}
                />
                <p className="help is-danger">{errors.name?.message}</p>
              </div>
            </div>
            <div className="field">
              <label className="label"></label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Description"
                  id="budgetDescription"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description for your budget is required",
                    },
                    validate: {
                      minLength: (fieldValue: string) => {
                        return (
                          fieldValue.length > 2 ||
                          "Description of your budget must be at least 3 characters"
                        );
                      },
                    },
                  })}
                ></textarea>
              </div>
              <p className="help is-danger">{errors.description?.message}</p>
            </div>

            <div className="field is-grouped is-grouped-centered">
              <button className="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                type="submit"
                className={`button is-link ${getIsLoadingClassName(
                  createBudgetPending
                )}`}
                id="createBudget"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setShowModal(false)}
      ></button>
    </div>
  );
}
