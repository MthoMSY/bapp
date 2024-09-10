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
        <a className="navbar-item" href="/">
          <strong>Budget App</strong>
        </a>

        <a
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <a className="navbar-item" onClick={() => navigate("/home")}>
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span>Home</span>
          </a>
          <a className="navbar-item" onClick={() => navigate("/about")}>
            <span className="icon">
              <i className="fas fa-info"></i>
            </span>
            <span>About</span>
          </a>
          <a className="navbar-item" onClick={() => navigate("/blogs")}>
            <span className="icon">
              <i className="fab fa-blogger"></i>
            </span>
            <span>Blogs</span>
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isLoggedIn ? (
                <>
                  <a className="button is-dark" onClick={() => navigate("/signup")}>
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-link" onClick={() => navigate("/login")}>
                    Log in
                  </a>
                </>
              ) : (
                <>
                  <a className="button is-link" onClick={() => navigate(`/${username}/budgets`)}>
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
