import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchBudgets } from "../features/user/userSlice";
import { Budget } from "../types/budget";
import { useNavigate } from "react-router-dom";
import { BudgetModal } from "./BudgetModal";

export const Budgets = () => {
  const { budgets, username, token } = useAppSelector((state) => state.user);

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
      {showCreateBudgetModal && <BudgetModal setShowModal={setShowCreateBudgetModal}/>}
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
                  onClick={() => navigate(`/budget/${budget.id}/item`)}
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
