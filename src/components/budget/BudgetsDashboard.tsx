import { useCallback, useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Budget } from "../../types/budget";
import { CreateBudgetModal } from "./CreateBudgetModal";
import { fetchBudgets } from "../../features/budget/budgetSlice";
import { BudgetsDisplay } from "./BudgetsDisplay";
import { signOut } from "../../features/user/userSlice";

export const BudgetsDashboard = () => {
  const { username, token } = useAppSelector((state) => state.user);
  const { budgets, loading } = useAppSelector((state) => state.budget);

  const [displayBudgets, setDisplayBudgets] = useState<Budget[]>(budgets);
  const [searchString] = useState<string>("");
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
        <CreateBudgetModal setShowModal={setShowCreateBudgetModal} />
      )}
      <div className="container is-fluid">
        <div className="content is-medium is-mobile-hidden">
          <p className="has-text-centered">
            <span className="has-text-weight-bold">
              Hey{" "}
              {username.length > 10 ? username.slice(0, 10) + "..." : username}{" "}
              ! <br />
              Welcome to easy budgets
            </span>
          </p>
        </div>

        <BudgetsDisplay
          budgets={displayBudgets}
          updateBudgets={refreshBudgets}
          isLoadingBudgets={loading}
        />
      </div>
    </>
  );
};
