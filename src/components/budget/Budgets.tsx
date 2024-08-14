import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Budget } from "../../types/budget";
import { BudgetModal } from "./CreateBudgetModal";
import { fetchBudgets } from "../../features/budget/budgetSlice";

export const Budgets = () => {
  const { username, token } = useAppSelector((state) => state.user);
  const {budgets} = useAppSelector((state) => state.budget)

  const [displayBudgets, setDisplayBudgets] = useState<Budget[]>(budgets);
  const [searchString, setSearchString] = useState<string>("");
  const [showCreateBudgetModal, setShowCreateBudgetModal] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBudgets({ token }));
  }, [username]);

  useEffect(() => {
    setDisplayBudgets(budgets);
  }, [budgets]);

  const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const sanitizeBudgetNameForUrl = (s: string): string => {
    return s.toLowerCase().trim().replaceAll(" ", "_");
  };

  useMemo(() => {
    if (searchString === "") setDisplayBudgets(budgets);

    const searchResult = budgets.filter(
      (budget) =>
        budget.name.toLowerCase().includes(searchString.toLowerCase()) ||
        budget.description.toLowerCase().includes(searchString.toLowerCase())
    );

    setDisplayBudgets(searchResult);
  }, [searchString]);

  return (
    <>
      {showCreateBudgetModal && (
        <BudgetModal setShowModal={setShowCreateBudgetModal} />
      )}
      <div className="container is-fluid">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button is-link is-outlined"
                onClick={() => setShowCreateBudgetModal(true)}
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
        <nav className="panel is-link">
          <p className="panel-heading has-text-centered">{`Hey ${capitalizeFirstLetter(
            username
          )}! Here are your budgets.`}</p>
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
          {displayBudgets.map((budget) => {
            return (
              <React.Fragment key={budget.id}>
                <a
                  className="panel-block is-active"
                  onClick={() =>
                    navigate(
                      `/budget/${sanitizeBudgetNameForUrl(budget.name)}/items`,
                      {
                        state: { id: budget.id },
                      }
                    )
                  }
                >
                  <span className="panel-icon">
                    <i className="fas fa-chart-line"></i>
                  </span>
                  {budget.name}
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
