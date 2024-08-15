import React from "react";
import { Item } from "../../../types/item";
import Decimal from "decimal.js";

interface Props {
  items: Item[];
}

const ItemsDisplay = (props: Props) => {
  const { items } = props;
  const getTotal = (): Decimal => {
    let sum: Decimal = new Decimal("0.00");
    items.map((item) => {
      sum = sum.add(new Decimal(item.cost.toString()));
    });

    return sum;
  };
  return (
    <div className="table-container">
      <table className="table is-striped is-fullwidth is narrow is-hoverable">
        <thead>
          <tr className="is-dark">
            <th>Name</th>
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
                <td onClick={() => console.log("Show item info card")}>
                  {item.name}
                </td>
                <td onClick={() => console.log("Show item info card")}>
                  {item.description}
                </td>
                <td onClick={() => console.log("Show item info card")}>
                  Grocery
                </td>
                <td onClick={() => console.log("Show item info card")}>
                  R{item.cost}
                </td>
                <td className="has-text-right">
                  <span
                    className="icon-text has-text-danger "
                    onClick={() =>
                      console.log("Show delete confirmation modal")
                    }
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
