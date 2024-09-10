export const Home = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-variable is-3">
          {[
            { title: "Live a budget lifestyle", content: "If you are looking to take control of your finances, being able to budget is a paramount skill that you need to acquire in order to achieve your goals. The Budget app can help you set up a quick budget on the go and manage your finances like the wealthy." },
            { title: "Why budget?", content: "Budgeting is a key tool that can help you achieve your financial goals. It is a fine print of what you are willing to spend or what you spend in reality. Therefore a Budget is the key to managing your finances and building wealth." },
            { title: "Reveal spending habits", content: "Budgeting helps you understand your spending habits. It will show a true reflection of your income and expenditure. This will help you understand where you are spending your money and make adjustments where necessary. A Budget is like a mirror that shows you your true financial standing." },
            { title: "Emergency fund", content: "You never know what can come up in the course of life. Hence it is paramount for you to have some sort of contingency plan in place. This is the function of the emergency fund. A Budget helps you build an emergency fund. With a budget you are able to allocate a set amount for the emergency fund and identify unnecessary expenditures that can be rather allocated to your emergency fund." },
          ].map((card, index) => (
            <div key={index} className="column is-full-mobile is-half-tablet is-one-quarter-desktop">
              <div className="card is-flex is-flex-direction-column" style={{ height: '100%' }}>
                <header className="card-header">
                  <p className="card-header-title">{card.title}</p>
                </header>
                <div className="card-content is-flex-grow-1">
                  <div className="content">{card.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
