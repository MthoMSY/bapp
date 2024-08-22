import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toast } from "react-toastify";
import { globalToastOptions } from "../../notifications";
import { createBudget } from "../../features/budget/budgetSlice";

interface Props {
  setShowModal: (show: boolean) => void;
}

type FormValues = {
  name: string;
  description: string;
};

export function BudgetModal(props: Props) {
  const { setShowModal } = props;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const onConfirm = (formValues: FormValues) => {
    dispatch(createBudget({ token, payload: formValues }))
      .unwrap()
      .then(() => {
        toast.success(
          `Successfully added a new budget ${formValues.name}`,
          globalToastOptions
        );
      })
      .catch(() => {
        toast.error("Error adding budget", globalToastOptions);
      });
    setShowModal(false);
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
          <form onSubmit={handleSubmit(onConfirm)} noValidate>
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
                    min: {
                      value: 3,
                      message:
                        "Name of your budget must be at least 3 characters",
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
                      message: "Description for your budget is required",
                      value: true,
                    },
                    min: {
                      value: 3,
                      message:
                        "Description of your budget must be at least 3 characters",
                    },
                  })}
                ></textarea>
              </div>
              <p className="help is-danger">{errors.description?.message}</p>
            </div>

            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button
                  type="submit"
                  className="button is-link"
                  id="createBudget"
                >
                  Confirm
                </button>
              </div>
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
