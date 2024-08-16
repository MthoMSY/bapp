import { DISCLAIMER } from "../assets/common-messages";

export const Home = () => {
  return (
    <section className="container is-fluid">
      <div className="content is-medium">
        <h1 className="title has-text-centered has-text-link">Easy Budget</h1>
      </div>
      <div className="content is-medium">
        <div className="fixed-grid has-2-cols has-1-cols-mobile ">
          <div className="grid">
            <div className="cell">
              <article className="message">
                <div className="message-header">
                  <p className="subtitle has-text-white">
                    Live a budget lifestyle
                  </p>
                </div>
                <div className="message-body has-text-white">
                  <p>
                    If you are looking to take control of your finances, being
                    able to budget is a paramount skill that you need to acquire
                    in order to achieve your goals. The Budget app can help you
                    set up a quick budget on the go and manage your finances
                    like the wealthy.
                  </p>
                </div>
              </article>
            </div>
            <div className="cell">
              <article className="message">
                <div className="message-header">
                  <p className="subtitle has-text-white">Why Budget?</p>
                </div>
                <div className="message-body has-text-white">
                  <p>
                    Budgeting is a key tool to help plan your finances so that
                    you can be in control of your money and what/how you spend
                    it. It is a fine print of what you are willing to spend.
                    Therefore a Budget is the key to managing your finances and
                    building wealth.
                  </p>
                </div>
              </article>
            </div>

            <div className="cell">
              <article className="message">
                <div className="message-header">
                  <p className="subtitle has-text-white">
                    Reveal spending habits
                  </p>
                </div>
                <div className="message-body has-text-white">
                  <p>
                    Budgeting will help identify what you spend on. It will show
                    a true reflection of your spending habits. This will inturn,
                    help you align your spending with your financial and
                    personal goals. A Budget is like a report that gives an
                    indication what you doing well and what you may not be doing
                    so well.
                  </p>
                </div>
              </article>
            </div>

            <div className="cell">
              <article className="message">
                <div className="message-header">
                  <p className="subtitle has-text-white">
                    Reveal spending habits
                  </p>
                </div>
                <div className="message-body has-text-white">
                  <p>
                    Budgeting will help identify what you spend on. It will show
                    a true reflection of your spending habits. This will inturn,
                    help you align your spending with your financial and
                    personal goals. A Budget is like a report that gives an
                    indication what you doing well and what you may not be doing
                    so well.
                  </p>
                </div>
              </article>
            </div>

            <div className="cell is-col-span-2">
              <article className="message">
                <div className="message-header">
                  <p className="subtitle has-text-white">Emergency fund</p>
                </div>
                <div className="message-body has-text-white">
                  <p>
                    You never know what can come up in the course of life. Hence
                    it is paramount for you to have some sort of contingency
                    plan in place. This is the function of the emergency fund. A
                    Budget helps you build an emergency fund. With a budget you
                    are able to allocate a set amount for the emergency fund
                    and, identify unnecessary expenditures that can be rather
                    allocated to your emergency fund. Once you have built an
                    emergency fund it will create great deal of financial peace
                    of mind and stability. Your emergency fund is the foundation
                    to your financial freedom.
                  </p>
                </div>
              </article>
            </div>
            <div className="cell is-col-span-2">
              <article className="message">
                <div className="message-header">
                  <p className="subtitle has-text-white has-text-danger">
                    Disclaimer
                  </p>
                </div>
                <div className="message-body has-text-white">
                  <p>{DISCLAIMER}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
