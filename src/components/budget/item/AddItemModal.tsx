import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { toast } from "react-toastify";
import { globalToastOptions } from "../../../notifications";
import { createBudgetItem } from "../../../features/budget/budgetSlice";
import { Category } from "../../../types/category.enum";

interface Props {
  setShowModal: (show: boolean) => void;
  updateBudgetItems: () => void;
  budgetId: string;
}

type FormValues = {
  name: string;
  description: string;
  cost: number;
  category: Category
};

const AddItemModal = (props: Props) => {
  const { setShowModal, budgetId, updateBudgetItems } = props;
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;

  const onConfirm = (formValues: FormValues) => {
    dispatch(createBudgetItem({ token, payload: { ...formValues, budgetId } }))
      .unwrap()
      .then(() => {
        toast.success(
          `Successfully added ${formValues.name} to your budget`,
          globalToastOptions
        );
        updateBudgetItems();
      })
      .catch(() => {
        toast.error("Error adding item to your budget", globalToastOptions);
      })
      .finally(() => setShowModal(false));
  };

  const { errors, isValid } = formState;
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="subtitle has-text-centered">
            <strong>Create Item</strong>
          </h2>
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
              <div className="control">
                <div className="select is-fullwidth">
                  <select {...register("category", {
                    validate: {
                      isCategorySelected: (value: Category) => {
                        return Object.keys(Category).includes(value) || "Select a category"
                      }
                    }
                  })}>
                    <option value="">Select a category</option>
                    {Object.keys(Category).map((category) => {
                      return <option value={category}>{category}</option>;
                    })}
                  </select>
                </div>
              </div>
              <p className="help is-danger">{errors.category?.message}</p>
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
                  disabled={!isValid}
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
