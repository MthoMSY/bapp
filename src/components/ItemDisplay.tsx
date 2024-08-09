import React from "react";
import { Item } from "../types/item";

interface Props {
  items: Item[];
}
const ItemDisplay = (props: Props) => {
  const { items } = props;
  return (
    <div className="fixed-grid has-8-cols">
      <div className="grid">
        {items.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <div className="cell is-col-span-2">
                <p className="heading">{item.name}</p>
              </div>
              <div className="cell is-col-span-5">
                <p className="heading">{item.description}</p>
              </div>
              <div className="cell">
                <p className="heading">R{item.cost}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;
