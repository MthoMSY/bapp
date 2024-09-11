import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signOut } from "../features/user/userSlice";
import { useAppToast } from "../hooks/useAppToast";

const NavigationBar = () => {
  const { isLoggedIn, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { success } = useAppToast();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <a
            className="navbar-item"
            onClick={() => {
              navigate("/");
              setIsActive(!isActive);
            }}
          >
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span>Home</span>
          </a>
          <a
            className="navbar-item"
            onClick={() => {
              navigate("/about");
              setIsActive(false);
            }}
          >
            <span className="icon">
              <i className="fas fa-info"></i>
            </span>
            <span>About</span>
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isLoggedIn ? (
                <>
                  <a
                    className="button is-dark"
                    onClick={() => {
                      navigate("/signup");
                      setIsActive(false);
                    }}
                  >
                    <strong>Sign up</strong>
                  </a>
                  <a
                    className="button is-link"
                    onClick={() => {
                      navigate("/login");
                      setIsActive(false);
                    }}
                  >
                    Log in
                  </a>
                </>
              ) : (
                <>
                  <a
                    className="button is-link"
                    onClick={() => {
                      navigate(`/${username}/budgets`);
                      setIsActive(false);
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-book"></i>
                    </span>
                    <span>Budgets</span>
                  </a>
                  <a
                    className="button is-danger"
                    onClick={() => {
                      dispatch(signOut());
                      success("Cheers!");
                      navigate("/login");
                      setIsActive(false);
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span>Sign out</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
