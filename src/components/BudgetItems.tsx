import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Item } from "../types/item";
import { fetchItems } from "../features/user/itemSlice";

export const BudgetItems = () => {
  const { items } = useAppSelector((state) => state.items);
  const { username, token } = useAppSelector((state) => state.user);

  const [displayItems, setDisplayItems] = useState<Item[]>(items);
  const [searchString, setSearchString] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems({ token }));
  }, [username]);

  useEffect(() => {
    setDisplayItems(items);
  }, [items]);

  const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useMemo(() => {
    if (searchString === "") setDisplayItems(items);

    const searchResult = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.description.toLowerCase().includes(searchString.toLowerCase())
    );

    setDisplayItems(searchResult);
  }, [searchString]);

  return (
    <div className="container is-fluid">
      <nav className="panel is-link">
        <p className="panel-heading has-text-centered">{`Hey ${capitalizeFirstLetter(
          username
        )}! Here are your items.`}</p>
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
  );
};
