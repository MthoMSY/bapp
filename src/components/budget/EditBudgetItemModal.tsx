import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateBudgetItem } from "../../features/budget/budgetSlice";
import { Item } from "../../types/item";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppToast } from "../../hooks/useAppToast";
import Decimal from "decimal.js";
import { Category } from "../../types/category.enum";

interface Props {
  item: Item;
  setShowModal: (show: boolean) => void;
  updateBudgetItems: () => void;
  budgetId: string;
}

const EditBudgetItemModal: React.FC<Props> = ({
  item,
  setShowModal,
  updateBudgetItems,
  budgetId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(item.name);
  const [description, setDescription] = useState<string>(item.description);
  const [cost, setCost] = useState<string>(item.cost.toString());
  const [category, setCategory] = useState<Category>(item.category);
  const token = useSelector((state: RootState) => state.user.token);
  const { success, error } = useAppToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(
      updateBudgetItem({
        itemId: item.id,
        payload: {
          name,
          description,
          cost: new Decimal(cost),
          category,
          budgetId,
        },
        token: token || "",
      })
    )
      .unwrap()
      .then(() => {
        updateBudgetItems();
        success("Budget item updated successfully");
        setShowModal(false);
      })
      .catch(() => {
        error("Failed to update budget item");
      })
      .finally(() => {
        setIsLoading(false);
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
          <p className="modal-card-title">Edit Budget Item</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setShowModal(false)}
          ></button>
        </header>
        <section className="modal-card-body">
          <form id="edit-budget-item" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Cost</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step="0.01"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            type="submit"
            form="edit-budget-item"
            className={`button is-success ${isLoading ? "is-loading" : ""}`}
            onClick={handleSubmit}
          >
            Save changes
          </button>
          <button className="button" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditBudgetItemModal;
