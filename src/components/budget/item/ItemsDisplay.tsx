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
}

const ItemsDisplay = (props: Props) => {
  const { items, updateBudgetItems, budgetId, totalCost, isLoadingItems } = props;
  const [selectedItem, setSelectedItem] = useState<undefined | Item>(undefined);
  const [showDeleteBudgetItemConfirmationModal, setShowDeleteBudgetItemConfirmationModal] = useState<boolean>(false);

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
      <div className="has-text-centered mb-4">
        <p className="has-text-weight-bold is-size-4 has-text-success-light">
          Total: R{totalCost.toString()}
        </p>
      </div>
      {!isLoadingItems ? (
        <div className="columns is-multiline">
          {items.map((item) => (
            <div key={item.id} className="column is-one-third-desktop is-half-tablet is-full-mobile">
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
