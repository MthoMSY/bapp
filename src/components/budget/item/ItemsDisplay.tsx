import { useState } from "react";
import { Item } from "../../../types/item";
import Decimal from "decimal.js";
import { DeleteBudgetItemConfirmationModal } from "../DeleteBudgetItemConfirmationModal";
import "./ItemsDisplay.css";

interface Props {
  items: Item[];
  updateBudgetItems: () => void;
  budgetId: string;
  totalCost: Decimal;
  isLoadingItems: boolean;
  budgetLimit: Decimal;
  budgetName: string;
}

const sanitizeBudgetName = (budgetName: string): string => {
  return (
    budgetName.charAt(0).toUpperCase() +
    budgetName.replaceAll("_", " ").toLowerCase().substring(1).trim()
  );
};

const isBudgetLimitExceeded = (
  totalCost: Decimal,
  budgetLimit: Decimal
): boolean => {
  if (budgetLimit.isZero()) {
    return false;
  }

  return totalCost.greaterThan(budgetLimit);
};

const ItemsDisplay = (props: Props) => {
  const {
    items,
    updateBudgetItems,
    budgetId,
    totalCost,
    isLoadingItems,
    budgetName,
    budgetLimit,
  } = props;
  const [selectedItem, setSelectedItem] = useState<undefined | Item>(undefined);
  const [
    showDeleteBudgetItemConfirmationModal,
    setShowDeleteBudgetItemConfirmationModal,
  ] = useState<boolean>(false);

  return (
    <div className="box">
      {showDeleteBudgetItemConfirmationModal && selectedItem && (
        <DeleteBudgetItemConfirmationModal
          itemId={selectedItem.id}
          setShowModal={setShowDeleteBudgetItemConfirmationModal}
          itemName={selectedItem.name}
          updateBudgetItems={updateBudgetItems}
          budgetId={budgetId}
        />
      )}
      <div
        className={`is-flex is-justify-content-space-between is-align-items-center mb-5 ${
          isBudgetLimitExceeded(totalCost, budgetLimit)
            ? "has-text-danger"
            : "has-text-success-light"
        }`}
      >
        <div className="is-hidden-mobile">
          <div className="tags has-addons">
            <span className={`tag has-text-weight-bold ${
              isBudgetLimitExceeded(totalCost, budgetLimit)
                ? "is-danger"
                : "is-warning"
            }`}>
            Expenses
          </span>
          <span className={`tag has-text-weight-bold ${
              isBudgetLimitExceeded(totalCost, budgetLimit)
                ? "is-danger is-light"
                : "is-warning is-light"
            }`}>
            R{" " + totalCost.toString()}
            </span>
          </div>
        </div>
        <div className="is-flex-grow-1 has-text-centered">
          <h2
            className={`title is-4 ${
              isBudgetLimitExceeded(totalCost, budgetLimit)
                ? "has-text-danger"
                : "has-text-success-light"
            }`}
          >
            {sanitizeBudgetName(budgetName)}
          </h2>
        </div>
        <div className="is-hidden-mobile">
          <div className="tags has-addons">
            <span className={`tag has-text-weight-bold ${
              isBudgetLimitExceeded(totalCost, budgetLimit)
                ? "is-danger is-light"
                : "is-success is-light"
            }`}>Limit</span>
            <span className={`tag has-text-weight-bold ${
              isBudgetLimitExceeded(totalCost, budgetLimit)
                ? "is-danger"
                : "is-success "
            }`}>
              {budgetLimit.isZero() ? "N/A" : `R${budgetLimit.toString()}`}
            </span>
          </div>
        </div>
      </div>
      {!isLoadingItems ? (
        <div className="columns is-multiline">
          {items.map((item) => (
            <div
              key={item.id}
              className="column is-one-third-desktop is-half-tablet is-full-mobile"
            >
              <div className="card h-100">
                <div className="card-content">
                  <div className="content">
                    <p className="title is-5">{item.name}</p>
                    <p className="subtitle is-6">{item.category}</p>
                    <p className="has-text-weight-bold">R{item.cost}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
                <footer className="card-footer">
                  <button
                    className="card-footer-item button is-danger is-light"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDeleteBudgetItemConfirmationModal(true);
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <progress className="progress is-large is-white" max="100">
          loading items...
        </progress>
      )}
    </div>
  );
};

export default ItemsDisplay;
