import React, { useState } from 'react';
import './BudgetsDisplay.css';  // Add this line
import { useNavigate } from "react-router-dom";
import { Budget } from "../../types/budget";
import { DeleteBudgetConfirmationModal } from "./DeleteBudgetConfirmationModal";
import { CreateBudgetModal } from "./CreateBudgetModal";
import { formatDate } from "../utils";

interface Props {
  budgets: Budget[];
  updateBudgets: () => void;
  isLoadingBudgets: boolean;
}

export const BudgetsDisplay = (props: Props) => {
  const { budgets, updateBudgets, isLoadingBudgets } = props;
  const [
    showDeleteBudgetConfirmationModal,
    setShowDeleteBudgetConfirmationModal,
  ] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [showCreateBudgetModal, setShowCreateBudgetModal] = useState(false);
  const navigate = useNavigate();

  const sanitizeBudgetNameForUrl = (s: string): string => {
    return s.toLowerCase().trim().replaceAll(" ", "_");
  };
  const navigateToBudget = (budgetId: string, budgetName: string): void => {
    navigate(`/budget/${sanitizeBudgetNameForUrl(budgetName)}/items`, {
      state: { id: budgetId },
    });
  };

  const filteredBudgets = budgets.filter((budget) => {
    const matchesSearch =
      budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterOption === "all") return matchesSearch;
    // Add more filter options as needed
    return matchesSearch;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setFilterOption("all");
  };

  return (
    <div className="container">
      {showCreateBudgetModal && (
        <CreateBudgetModal setShowModal={setShowCreateBudgetModal} />
      )}
      <div className="box mb-4">
        <div className="columns is-multiline is-mobile">
          <div className="column is-12-mobile is-6-tablet is-3-desktop">
            <button
              className="button is-link is-fullwidth"
              onClick={() => setShowCreateBudgetModal(true)}
            >
              <span className="icon">
                <i className="fas fa-plus-square"></i>
              </span>
              <span>Create</span>
            </button>
          </div>
          <div className="column is-12-mobile is-6-tablet is-3-desktop">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="column is-12-mobile is-6-tablet is-3-desktop">
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option value="all">All Budgets</option>
                    {/* Add more filter options as needed */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-12-mobile is-6-tablet is-3-desktop">
            <button
              className="button is-info is-fullwidth"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {showDeleteBudgetConfirmationModal && selectedBudget && (
        <DeleteBudgetConfirmationModal
          setShowModal={setShowDeleteBudgetConfirmationModal}
          budgetId={selectedBudget.id}
          budgetName={selectedBudget.name}
          updateBudgets={updateBudgets}
        />
      )}
      {!isLoadingBudgets && (
        <div className="columns is-multiline is-mobile">
          {filteredBudgets.map((budget) => (
            <div
              key={budget.id}
              className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen"
            >
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title is-centered">{budget.name}</p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <span className="has-text-weight-bold">Limit:</span>{" "}
                    {budget.limit ? budget.limit.toString() : "No limit"}
                  </div>
                  <div className="content">
                    <span className="has-text-weight-bold">Description:</span>{" "}
                    <span 
                      className="has-tooltip-multiline has-tooltip-right no-underline" 
                      data-tooltip={budget.description}
                    >
                      {budget.description.length > 10
                        ? budget.description.slice(0, 10) + "..."
                        : budget.description}
                    </span>
                  </div>
                  <div className="content">
                    <span className="has-text-weight-bold">Created:</span>{" "}
                    {formatDate(budget.createdAt)}
                  </div>
                </div>
                <footer className="card-footer">
                  <a
                    href="#"
                    className="card-footer-item"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBudget(budget);
                      navigateToBudget(budget.id, budget.name);
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-eye "></i>
                    </span>
                    <span className="is-hidden-mobile">View</span>
                  </a>
                  <a
                    href="#"
                    className="card-footer-item"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBudget(budget);
                    }}
                  >
                    <span className="icon has-text-info">
                      <i className="fas fa-pencil-alt pr-1"></i>
                    </span>
                    <span className="is-hidden-mobile has-text-info">Edit</span>
                  </a>
                  <a
                    href="#"
                    className="card-footer-item has-text-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBudget(budget);
                      setShowDeleteBudgetConfirmationModal(true);
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                    <span className="is-hidden-mobile">Delete</span>
                  </a>
                </footer>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoadingBudgets && (
        <progress className="progress is-large is-info" max="100">
          Loading budgets...
        </progress>
      )}
    </div>
  );
};
