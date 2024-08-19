import React, { useState } from "react";
import { Item } from "../../../types/item";
import Decimal from "decimal.js";
import { DeleteBudgetItemConfirmationModal } from "../DeleteBudgetItemConfirmationModal";

interface Props {
  items: Item[];
  updateBudgetItems: () => void
  budgetId: string
}

const ItemsDisplay = (props: Props) => {
  const { items, updateBudgetItems, budgetId } = props;

  const [selectedItem, setSelectedItem] = useState<undefined | Item>(undefined);

  const [
    showDeleteBudgetItemConfirmationModal,
    setShowDeleteBudgetItemConfirmationModal,
  ] = useState<boolean>(false);

  const getTotal = (): Decimal => {
    let sum: Decimal = new Decimal("0.00");
    items.map((item) => {
      sum = sum.add(new Decimal(item.cost.toString()));
    });

    return sum;
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
      <table className="table is-striped is-fullwidth is narrow is-hoverable">
        <thead>
          <tr className="is-dark">
            <th>Item</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th className="has-text-right has-text-primary">
              Total: R{getTotal().toString()}
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr className="is-dark">
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th className="has-text-right has-text-primary">
              Total: R{getTotal().toString()}
            </th>
          </tr>
        </tfoot>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td
                  onClick={() => {
                    console.log("Show item info card");
                    setSelectedItem(item);
                  }}
                >
                  {item.name}
                </td>
                <td
                  onClick={() => {
                    console.log("Show item info card");
                    setSelectedItem(item);
                  }}
                >
                  {item.description}
                </td>
                <td
                  onClick={() => {
                    console.log("Show item info card");
                    setSelectedItem(item);
                  }}
                >
                  Grocery
                </td>
                <td
                  onClick={() => {
                    console.log("Show item info card");
                    setSelectedItem(item);
                  }}
                >
                  R{item.cost}
                </td>
                <td className="has-text-right">
                  <span
                    className="icon-text has-text-danger "
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDeleteBudgetItemConfirmationModal(true)
                    }}
                  >
                    <span className="icon is-medium">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsDisplay;
