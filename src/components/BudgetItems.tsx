import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Item } from "../types/item";
import { fetchItems } from "../features/user/itemSlice";
import { useParams } from "react-router-dom";
import { Budget } from "../types/budget";
import AddItemModal from "./AddItemModal";

export const BudgetItems = () => {
  const { budgets } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const { username, token } = useAppSelector((state) => state.user);

  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);

  const [budget, setBudget] = useState<Budget | undefined>(
    budgets.find((budget) => budget.id === id)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems({ token }));
  }, [username]);

  // todo make use of this function
  const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useMemo(() => {
    if (!budget) return;

    if (searchString === "") setDisplayItems(budget.items);

    const searchResult = budget.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.description.toLowerCase().includes(searchString.toLowerCase())
    );

    setDisplayItems(searchResult);
  }, [searchString]);

  return (
    <>
      {showAddItemModal && budget && (
        <AddItemModal budgetId={budget.id} setShowModal={setShowAddItemModal} />
      )}
      <div className="container is-fluid">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button is-danger is-outlined"
                onClick={() => console.log("remove item confirmation model")}
              >
                <span className="icon">
                  <i className="fas fa-minus-square"></i>
                </span>
                <span>
                  <strong>Remove</strong>
                </span>
              </button>
            </div>
            <div className="navbar-item">
              <button
                className="button is-link is-outlined"
                onClick={() => setShowAddItemModal(true)}
              >
                <span className="icon">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span>
                  <strong>Add</strong>
                </span>
              </button>
            </div>
          </div>
        </nav>
        <nav className="panel is-link">
          <p className="panel-heading has-text-centered">
            {budget?.name || ""}
          </p>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                value={searchString}
                className="input"
                onChange={(e) => {
                  setSearchString(e.target.value);
                }}
                type="text"
                placeholder="Search"
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          {displayItems.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <a className="panel-block is-active">
                  <span className="panel-icon">
                    <i className="fas fa-chart-line"></i>
                  </span>
                  {item.name}
                </a>
              </React.Fragment>
            );
          })}

          <div className="panel-block">
            <button
              onClick={() => setSearchString("")}
              className="button is-link is-outlined is-fullwidth"
            >
              Reset all filters
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};
