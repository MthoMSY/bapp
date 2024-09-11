import { useState } from "react";
import { deleteBudgetItem } from "../../features/budget/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAppToast } from "../../hooks/useAppToast";
import { getIsLoadingClassName } from "../utils";

interface Props {
  setShowModal: (show: boolean) => void;
  itemId: string;
  budgetId: string;
  itemName: string;
  updateBudgetItems: () => void;
}

export const DeleteBudgetItemConfirmationModal = (props: Props) => {
  const { updateBudgetItems, itemId, setShowModal, itemName, budgetId } = props;
  const { success, error } = useAppToast();
  const [deleteItemPending, setDeleteItemPending] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    setDeleteItemPending(true);
    dispatch(deleteBudgetItem({ token, payload: { itemId, budgetId } }))
      .unwrap()
      .then(() => {
        success(`Successfully removed ${itemName} from your budget`);
        updateBudgetItems();
      })
      .catch(() => {
        error("Error removing item from your budget");
      })
      .finally(() => {
        setDeleteItemPending(false);
        setShowModal(false);
      });
  };
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <p className="modal-card-title has-text-centered">
            Delete Budget Item
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <section className="modal-card-body">
          <div className="content has-text-centered">
            <h5>
              Are you sure you want to delete <a className="has-text-danger">{itemName}</a> from your budget
              items?
            </h5>
          </div>
          <hr className="modal-divider" />
          <div className="buttons is-centered">
            <button className="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button
              className={`button is-danger ${getIsLoadingClassName(
                deleteItemPending
              )}`}
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </section>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setShowModal(false)}
      ></button>
    </div>
  );
};
