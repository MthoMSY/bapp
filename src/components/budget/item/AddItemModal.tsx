import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { createBudgetItem } from "../../../features/user/userSlice";

interface Props {
  setShowModal: (show: boolean) => void;
  budgetId: string;
}

type FormValues = {
  name: string;
  description: string;
  cost: number;
};

const AddItemModal = (props: Props) => {
  const { setShowModal, budgetId } = props;
  const { token } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;

  const onConfirm = (formValues: FormValues) => {
    dispatch(createBudgetItem({ token, payload: { ...formValues, budgetId } }));
    setShowModal(false);
  };

  const { errors } = formState;
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <form onSubmit={handleSubmit(onConfirm)} noValidate>
            {/*  */}
            <div className="field">
              <label className="label"></label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  id="itemName"
                  {...register("name", {
                    required: {
                      message: "Name for your item is required",
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
            {/*  */}
            <div className="field">
              <label className="label"></label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Cost"
                  id="itemCost"
                  {...register("cost", {
                    required: {
                      message: "Cost of your item is required",
                      value: true,
                    },
                    validate: {
                      greaterThanZero: (fieldValue: number) => {
                        return (
                          fieldValue > 0 || "Cost must be greater than zero"
                        );
                      },
                    },
                  })}
                />
                <p className="help is-danger">{errors.cost?.message}</p>
              </div>
            </div>
            {/*  */}
            <div className="field">
              <label className="label"></label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Description"
                  id="itemDescription"
                  {...register("description", {})}
                ></textarea>
              </div>
              <p className="help is-danger">{errors.description?.message}</p>
            </div>
            {/*  */}
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
};

export default AddItemModal;
