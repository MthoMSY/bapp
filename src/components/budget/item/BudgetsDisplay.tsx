import { useNavigate } from "react-router-dom";
import { Budget } from "../../../types/budget";
import { useState } from "react";
import { DeleteBudgetConfirmationModal } from "../DeleteBudgetConfirmationModal";

interface Props {
  budgets: Budget[];
  updateBudgets: () => void
}
export const BudgetsDisplay = (props: Props) => {
  const { budgets, updateBudgets } = props;
  const [
    showDeleteBudgetConfirmationModal,
    setShowDeleteBudgetConfirmationModal,
  ] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const sanitizeBudgetNameForUrl = (s: string): string => {
    return s.toLowerCase().trim().replaceAll(" ", "_");
  };
  const navigateToBudget = (budgetId: string, budgetName: string): void => {
    navigate(`/budget/${sanitizeBudgetNameForUrl(budgetName)}/items`, {
      state: { id: budgetId },
    });
  };
  const getType = (): string => {
    const num = Math.floor(Math.random() * 2);
    if (num == 0) return "Strict";
    return "Flexible";
  };

  return (
    <div className="table-container">
      {showDeleteBudgetConfirmationModal && selectedBudget && (
        <DeleteBudgetConfirmationModal
          setShowModal={setShowDeleteBudgetConfirmationModal}
          budgetId={selectedBudget.id}
          budgetName={selectedBudget.name}
          updateBudgets={updateBudgets}
        />
      )}
      <table className="table is-striped is-fullwidth is narrow is-hoverable">
        <thead>
          <tr className="is-dark">
            <th>Budget</th>
            <th>Description</th>
            <th>Type</th>
            <th>Goal</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => {
            return (
              <tr key={budget.id}>
                <td
                  onClick={() => {
                    setSelectedBudget(budget);
                    navigateToBudget(budget.id, budget.name);
                  }}
                >
                  {budget.name}
                </td>
                <td
                  onClick={() => {
                    setSelectedBudget(budget);
                    navigateToBudget(budget.id, budget.name);
                  }}
                >
                  {budget.description}
                </td>
                <td
                  onClick={() => {
                    setSelectedBudget(budget);
                    navigateToBudget(budget.id, budget.name);
                  }}
                >
                  {getType()}
                </td>
                <td
                  onClick={() => {
                    setSelectedBudget(budget);
                    navigateToBudget(budget.id, budget.name);
                  }}
                >
                  R50
                </td>
                <td className="has-text-right">
                  <span
                    className="icon-text has-text-link "
                    onClick={() => {
                      console.log("Show detail card of budget");
                      setSelectedBudget(budget);
                    }}
                  >
                    <span className="icon is-medium">
                      <i className="fas fa-expand"></i>
                    </span>
                  </span>
                </td>
                <td className="has-text-right">
                  <span
                    className="icon-text has-text-danger "
                    onClick={() => {
                      setSelectedBudget(budget);
                      setShowDeleteBudgetConfirmationModal(true);
                    }}
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
