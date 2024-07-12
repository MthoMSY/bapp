const items = [
  { name: "Avocado", description: "", cost: 35 },
  { name: "Bread", description: "", cost: 25 },
  { name: "onions", description: "1kg", cost: 45 },
  { name: "Tomatoes", description: "1kg", cost: 33.23 },
  { name: "Inkomazi", description: "2 litres", cost: 29.8 },
  { name: "Cheese", description: "", cost: 38.47 },
  { name: "Lucky Star tin fish", description: "Hot", cost: 26.99 },
  { name: "Wine gums", description: "Maynards", cost: 12 },
];

const totalCost = (): number => {
  let sum = 0;
  items.forEach((item) => (sum += item.cost));
  return sum;
};

export function Items() {
  return (
    <>
 {/* <!-- Main container --> */}
<nav className="level">
  {/* <!-- Left side --> */}
  <div className="level-left">
    <div className="level-item">
      <p className="subtitle is-5"><strong>123</strong> items</p>
    </div>
    <div className="level-item">
      <div className="field has-addons">
        <p className="control">
          <input className="input" type="text" placeholder="Find an item" />
        </p>
        <p className="control">
          <button className="button">Search</button>
        </p>
      </div>
    </div>
  </div>

  {/* <!-- Right side --> */}
  <div className="level-right">
    <p className="level-item"><button className="button is-primary">
    <span className="icon">
      <i className="fas fa-cart-plus"></i>
    </span>
    <span>Add item</span>
  </button></p>
  </div>
</nav>
      <div className="table-container">
        <table className="table is-fullwidth is-hoverable is-striped is-bordered">
          <tfoot>
            <th>Total</th>
            <td></td>
            <th>R{totalCost()}</th>
          </tfoot>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Cost</th>
            </tr>
            {items.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>R{item.cost}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
