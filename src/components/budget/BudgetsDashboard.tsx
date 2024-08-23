import { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Budget } from "../../types/budget";
import { BudgetModal } from "./CreateBudgetModal";
import { fetchBudgets } from "../../features/budget/budgetSlice";
import { BudgetsDisplay } from "./item/BudgetsDisplay";
import { signOut } from "../../features/user/userSlice";

export const BudgetsDashboard = () => {
  const { username, token } = useAppSelector((state) => state.user);
  const { budgets } = useAppSelector((state) => state.budget);

  const [displayBudgets, setDisplayBudgets] = useState<Budget[]>(budgets);
  const [searchString, setSearchString] = useState<string>("");
  const [showCreateBudgetModal, setShowCreateBudgetModal] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  const refreshBudgets = useCallback((): void => {
    if (!token) return;
    dispatch(fetchBudgets({ token }))
      .unwrap()
      .catch((error) => {
        if (error.code === 401) dispatch(signOut());
      });
  }, [dispatch, token]);

  useEffect(() => {
    refreshBudgets();
  }, [refreshBudgets, username]);

  useEffect(() => {
    setDisplayBudgets(budgets);
  }, [budgets]);

  useMemo(() => {
    if (searchString === "") setDisplayBudgets(budgets);

    const searchResult = budgets.filter(
      (budget) =>
        budget.name.toLowerCase().includes(searchString.toLowerCase()) ||
        budget.description.toLowerCase().includes(searchString.toLowerCase())
    );

    setDisplayBudgets(searchResult);
  }, [budgets, searchString]);

  return (
    <>
      {showCreateBudgetModal && (
        <BudgetModal setShowModal={setShowCreateBudgetModal} />
      )}
      <div className="container is-fluid">
        <div className="content is-medium">
          <h1 className="title has-text-centered has-text-link">Budgets</h1>
        </div>

        <nav
          className="navbar pb-2"
          role="navigation"
          aria-label="budgets navigation"
        >
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
                onClick={() => setShowCreateBudgetModal(true)}
              >
                <span className="icon">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span>
                  <strong>Create Budget</strong>
                </span>
              </button>
            </div>
          </div>
        </nav>
        <BudgetsDisplay
          budgets={displayBudgets}
          updateBudgets={refreshBudgets}
        />
      </div>
    </>
  );
};
