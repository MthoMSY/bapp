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

const totalCost = ():number =>{
        let sum = 0
        items.forEach((item) => sum += item.cost)
return sum
    }

export function Report() {
  return (
    <div className="table-container">
      <table className="table is-fullwidth is-hoverable">
        <tfoot>
          <th>Total</th>
          <td></td>
          <th>{totalCost()}</th>
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
              <td>{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
