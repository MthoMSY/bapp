import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer } from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <div className="container is-fluid">
        <ToastContainer />
        <Header />
        <NavigationBar />
        <div className="hero is-fullheight-with-navbar">
          <Outlet />
          <div className="hero-foot">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
