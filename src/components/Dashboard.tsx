import { Report } from "./Report";
export function Dashboard() {
  const budgets = [
    { id: 1, name: "First" },
    { id: 2, name: "Second" },
    { id: 3, name: "Third" },
    { id: 4, name: "Fourth" },
    { id: 4, name: "Fifth" },
    { id: 4, name: "Sixth" },
    { id: 4, name: "Seventh" },
    { id: 4, name: "Eighth" },
    { id: 4, name: "Ninth" },
    { id: 4, name: "Tenth" },
  ];
  return (
    <div className="columns is-mobile">
      <div className="column is-one-third is-half">
        <h2 className="subtitle has-text-centered">Your active budgets</h2>
        <div className="table-container">
          <table>
            {budgets.map((budget) => (
              <tr>
                <td>
                  <button
                    className="button is-fullwidth is-responsive is-ghost"
                    is-ghost
                  >
                    {budget.name}
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className="column">
        <h2 className="subtitle has-text-centered">Report</h2>
        <Report />
      </div>
    </div>
  );
}
