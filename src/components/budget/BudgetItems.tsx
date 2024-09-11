import { useCallback, useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Item } from "../../types/item";
import { useLocation, useParams } from "react-router-dom";
import ItemsDisplay from "./item/ItemsDisplay";
import AddItemModal from "./item/AddItemModal";
import { getBudgetItems } from "../../features/budget/budgetSlice";
import Decimal from "decimal.js";
import "./BudgetItems.css"; // Make sure to create this CSS file

export const BudgetItems = () => {
  const location = useLocation();
  const { id } = location.state;
  const { budgetName } = useParams();
  const { username, token } = useAppSelector((state) => state.user);

  const [items, setItems] = useState<Item[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false);
  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);
  const [currentItemsPage, setCurrentItemsPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentItems, setCurrentItems] = useState<Item[]>([]);

  /* Item display pagination */

  useEffect(() => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.ceil(displayItems.length / itemsPerPage); i++) {
      pages.push(i);
    }

    setPageNumbers(pages);

    const indexOfLastItem = currentItemsPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(displayItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [displayItems, itemsPerPage, currentItemsPage]);

  /* --------------------------------------- */

  const dispatch = useAppDispatch();

  const getTotal = (): Decimal => {
    let sum: Decimal = new Decimal("0.00");
    items.map((item) => {
      sum = sum.add(new Decimal(item.cost.toString()));
    });

    return sum;
  };
  const updateItems = useCallback(() => {
    if (!token) return;
    setSearchString("");
    setIsLoadingItems(true);
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
      })
      .finally(() => setIsLoadingItems(false));
  }, [budgetName, dispatch, id, token]);

  useEffect(() => {
    updateItems();
  }, [updateItems, username]);

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
  }, [items, searchString]);

  return (
    <>
      {showAddItemModal && (
        <AddItemModal
          budgetId={id}
          setShowModal={setShowAddItemModal}
          updateBudgetItems={updateItems}
        />
      )}
      <div className="container is-fluid budget-items-container">
        <div className="box">
          <div className="columns is-multiline">
            <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    value={searchString}
                    className="input"
                    onChange={(e) => setSearchString(e.target.value)}
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
              <div className="buttons">
                <button className="button is-link is-outlined">
                  <span className="icon is-small">
                    <i className="fas fa-filter"></i>
                  </span>
                  <span>Add filters</span>
                </button>
                <button
                  onClick={() => setSearchString("")}
                  className="button is-warning is-outlined"
                >
                  <span className="icon is-small">
                    <i className="fas fa-power-off"></i>
                  </span>
                  <span>Reset filters</span>
                </button>
              </div>
            </div>
            <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
              <button
                className="button is-link is-fullwidth"
                onClick={() => setShowAddItemModal(true)}
              >
                <span className="icon">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span>Create Item</span>
              </button>
            </div>
          </div>
        </div>

        <ItemsDisplay
          items={currentItems}
          budgetId={id}
          updateBudgetItems={updateItems}
          totalCost={getTotal()}
          isLoadingItems={isLoadingItems}
        />

        {/* Pagination */}
        <nav
          className="pagination is-rounded is-centered mb-5"
          role="navigation"
          aria-label="pagination"
        >
          <a
            className="pagination-previous"
            onClick={() => {
              if (currentItemsPage > 1)
                setCurrentItemsPage(currentItemsPage - 1);
            }}
          >
            Previous
          </a>
          <a
            className="pagination-next"
            onClick={() => {
              if (currentItemsPage < pageNumbers.length)
                setCurrentItemsPage(currentItemsPage + 1);
            }}
          >
            Next page
          </a>
          <ul className="pagination-list">
            {pageNumbers.map((page) => (
              <li key={page}>
                <a
                  className={`pagination-link ${
                    page === currentItemsPage ? "is-current" : ""
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentItemsPage ? "page" : undefined}
                  onClick={() => setCurrentItemsPage(page)}
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
