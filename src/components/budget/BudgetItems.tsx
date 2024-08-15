import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Item } from "../../types/item";
import { useLocation, useParams } from "react-router-dom";
import ItemsDisplay from "./item/ItemDisplay";
import AddItemModal from "./item/AddItemModal";
import { getBudgetItems } from "../../features/budget/budgetSlice";

export const BudgetItems = () => {
  const location = useLocation();
  const { id } = location.state;
  const { budgetName } = useParams();
  const { username, token } = useAppSelector((state) => state.user);

  const [items, setItems] = useState<Item[]>([]);
  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const updateItems = () => {
    if (!token) return;
    setSearchString("");
    dispatch(getBudgetItems({ budgetId: id, token }))
      .unwrap()
      .then((data: Item[]) => {
        setItems(data);
        setDisplayItems(data);
      })
      .catch((error) => {
        console.error(
          `Error fetching items for budget: ${budgetName} ${error.code}`
        );
        console.error(`${JSON.stringify(error)}`);
      });
  };

  useEffect(() => {
    updateItems();
  }, [username]);

  useMemo(() => {
    if (searchString === "") {
      setDisplayItems(items);
      return;
    }

    const searchResult = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.description.toLowerCase().includes(searchString.toLowerCase())
    );

    setDisplayItems(searchResult);
  }, [searchString]);

  return (
    <>
      {showAddItemModal && (
        <AddItemModal
          budgetId={id}
          setShowModal={setShowAddItemModal}
          updateBudgetItems={async () => {
            updateItems();
          }}
        />
      )}
      <div className="container is-fluid">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-start">
            <div className="navbar-item">
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
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-link is-outlined is-small">
                  <span className="icon is-left">
                    <i className="fas fa-filter"></i>
                  </span>
                  <span>Add filters</span>
                </button>
                <button
                  onClick={() => {
                    // todo: clear all filters
                    setSearchString("");
                  }}
                  className="button is-warning is-outlined is-small"
                >
                  <span className="icon is-left">
                    <i className="fas fa-power-off"></i>
                  </span>
                  <span>Reset all filters</span>
                </button>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button is-link is-outlined is-fullwidth"
                onClick={() => setShowAddItemModal(true)}
              >
                <span className="icon">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span>
                  <strong>Create</strong>
                </span>
              </button>
            </div>
          </div>
        </nav>
        <nav className="level">
          <div className="level-item has-text-centered">
            <p className="title">{budgetName || ""}</p>
          </div>
        </nav>
        <ItemsDisplay items={displayItems} />
      </div>
    </>
  );
};
