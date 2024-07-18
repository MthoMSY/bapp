import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchBudgets } from "../features/user/userSlice";

export const Budgets = () => {
  const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const { budgets, username, token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBudgets({ token }));
  }, [username]);

  return (
    <div className="container is-fluid">
      <nav className="panel is-link">
        <p className="panel-heading has-text-centered">{`Hey ${capitalizeFirstLetter(
          username
        )}! Here are your budgets.`}</p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Search" />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        {budgets.map((budget) => {
          return (
            <>
              <a className="panel-block is-active">
                <span className="panel-icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                {budget.name}
              </a>
            </>
          );
        })}

        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </div>
      </nav>
    </div>
  );
};
