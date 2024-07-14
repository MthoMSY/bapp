import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <div className="section">
          <h1 className="title has-text-centered">Easy budget App</h1>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
