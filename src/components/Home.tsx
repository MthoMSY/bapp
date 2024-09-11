import React, { useState, useEffect } from 'react';

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = [
    {
      title: "Live a budget lifestyle",
      content:
        "If you are looking to take control of your finances, being able to budget is a paramount skill that you need to acquire in order to achieve your goals. The Budget app can help you set up a quick budget on the go and manage your finances like the wealthy.",
    },
    {
      title: "Why budget?",
      content:
        "Budgeting is a key tool that can help you achieve your financial goals. It is a fine print of what you are willing to spend or what you spend in reality. Therefore a Budget is the key to managing your finances and building wealth.",
    },
    {
      title: "Reveal spending habits",
      content:
        "Budgeting helps you understand your spending habits. It will show a true reflection of your income and expenditure. This will help you understand where you are spending your money and make adjustments where necessary. A Budget is like a mirror that shows you your true financial standing.",
    },
    {
      title: "Emergency fund",
      content:
        "You never know what can come up in the course of life. Hence it is paramount for you to have some sort of contingency plan in place. This is the function of the emergency fund. A Budget helps you build an emergency fund. With a budget you are able to allocate a set amount for the emergency fund and identify unnecessary expenditures that can be rather allocated to your emergency fund.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="tabs is-centered">
          <ul>
            {cards.map((_, index) => (
              <li key={index} className={index === activeIndex ? 'is-active' : ''}>
                <a onClick={() => setActiveIndex(index)}>{index + 1}</a>
              </li>
            ))}
          </ul>
        </div>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">{cards[activeIndex].title}</p>
            </header>
            <div className="card-content">
              <div className="content">{cards[activeIndex].content}</div>
            </div>
          </div>
        <div className="buttons is-centered mt-4">
          <button
            className="button is-primary"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)}
          >
            Previous
          </button>
          <button
            className="button is-primary"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
