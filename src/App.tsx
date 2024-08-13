import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
        <div className="section">
          <h1 className="title has-text-centered">Easy Budget</h1>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
