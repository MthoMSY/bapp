import { deleteBudget } from "../../features/budget/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAppToast } from "../../hooks/useAppToast";

interface Props {
  setShowModal: (show: boolean) => void;
  budgetId: string;
  budgetName: string;
  updateBudgets: () => void;
}

export const DeleteBudgetConfirmationModal = (props: Props) => {
  const { setShowModal, budgetId, budgetName, updateBudgets } = props;
  const { success, error } = useAppToast();
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const onConfirm = () => {
    dispatch(deleteBudget({ token, payload: { budgetId } }))
      .unwrap()
      .then(() => {
        success(`Successfully removed ${budgetName} from your budget`);
        updateBudgets();
      })
      .catch(() => {
        error("Error removing item from your budget");
      })
      .finally(() => setShowModal(false));
  };
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <p className="modal-card-title has-text-centered">Delete Budget</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <section className="modal-card-body">
          <div className="content has-text-centered">
            <h5>
              Are you sure you want to delete <a>{budgetName}</a> from your
              budgets?
            </h5>
          </div>
          <hr className="modal-divider" />
          <div className="buttons is-centered">
            <button className="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="button is-danger" onClick={onConfirm}>
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
