import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { signOut } from "./features/user/userSlice";

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <ToastContainer />
        <div className="container is-fluid">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-start">
              <div className="navbar-item">
                <div className="buttons">
                  <a
                    className="button is-info"
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-home"></i>
                    </span>
                    <strong>Home</strong>
                  </a>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                {!isLoggedIn && (
                  <div className="buttons">
                    <a
                      className="button is-dark"
                      onClick={() => navigate("/signup")}
                    >
                      <strong>Sign up</strong>
                    </a>
                    <a
                      className="button is-link"
                      onClick={() => navigate("/login")}
                    >
                      Log in
                    </a>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="buttons">
                    <a
                      className="button is-link"
                      onClick={() => {
                        dispatch(signOut());
                        toast.success("Cheers!");
                        navigate("/login");
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sign-out-alt"></i>
                      </span>
                      <strong>Sign out</strong>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
