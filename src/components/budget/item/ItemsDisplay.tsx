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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItemExpansion = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <div className="table-container">
      {showDeleteBudgetItemConfirmationModal && selectedItem && (
        <DeleteBudgetItemConfirmationModal
          itemId={selectedItem.id}
          setShowModal={setShowDeleteBudgetItemConfirmationModal}
          itemName={selectedItem.name}
          updateBudgetItems={updateBudgetItems}
          budgetId={budgetId}
        />
      )}
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <h2 className="title is-4">Budget Items</h2>
        <p className="has-text-weight-bold has-text-warning">
          Total: R{totalCost.toString()}
        </p>
      </div>
      {!isLoadingItems && (
        <div className="table-wrapper">
          <table className="table is-fullwidth is-striped is-narrow is-hoverable">
            <thead>
              <tr>
                <th>Item</th>
                <th className="is-hidden-mobile">Description</th>
                <th className="is-hidden-mobile">Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={expandedItems.has(item.id) ? "is-expanded" : ""}>
                  <td onClick={() => toggleItemExpansion(item.id)}>
                    {item.name}
                    <span className="icon is-small ml-2">
                      <i className={`fas fa-chevron-${expandedItems.has(item.id) ? 'up' : 'down'}`}></i>
                    </span>
                  </td>
                  <td className="is-hidden-mobile">{item.description}</td>
                  <td className="is-hidden-mobile">{item.category}</td>
                  <td>R{item.cost}</td>
                  <td>
                    <button
                      className="button is-small is-danger is-light"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowDeleteBudgetItemConfirmationModal(true);
                      }}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isLoadingItems && (
        <progress className="progress is-large is-white" max="100">
          loading items...
        </progress>
      )}
    </div>
  );
};

export default ItemsDisplay;
