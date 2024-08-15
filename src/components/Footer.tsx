import React from "react";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Easy Budget</strong> by{" "}
          <a href="https://www.linkedin.com/in/mthokozisi-myeza-0490b4ba">Mthokozisi</a>
          .
        </p>
        <p className="buttons is-centered">
          <a href="https://www.linkedin.com/in/mthokozisi-myeza-0490b4ba" className="button has-text-link">
            <span className="icon is-small">
              <i className="fab fa-linkedin"></i>
            </span>
            <span>LinkedIn</span>
          </a>
        </p>
      </div>
    </footer>
  );
};
