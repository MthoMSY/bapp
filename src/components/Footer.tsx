import React from "react";
import { DISCLAIMER } from "../assets/common-messages";

export const Footer = () => {
  return (
    <div className="container is-fluid">
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Easy Budget</strong> by{" "}
            <a href="https://www.linkedin.com/in/mthokozisi-myeza-0490b4ba">
              Mthokozisi
            </a>
            . © Copyright {new Date().getFullYear().toString()}
          </p>
          <p className="buttons is-centered">
            <a
              href="https://www.linkedin.com/in/mthokozisi-myeza-0490b4ba"
              className="button has-text-link"
            >
              <span className="icon is-small">
                <i className="fab fa-linkedin"></i>
              </span>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/MthoMSY"
              className="button has-text-link"
            >
              <span className="icon is-small">
                <i className="fab fa-github"></i>
              </span>
              <span>GitHub</span>
            </a>
          </p>
          <div className="content is-small">
            <p className="has-text-link">{DISCLAIMER}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
