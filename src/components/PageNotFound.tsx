import { NavLink } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <section className="hero is-link">
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title">Page not found</p>
          <NavLink className="subtitle" to="/home">
            Go to Home page
          </NavLink>
        </div>
      </div>
    </section>
  );
};
