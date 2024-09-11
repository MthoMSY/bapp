import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-2 has-text-centered mb-6">About Our Budget App</h1>

        <div className="columns is-multiline">
          <div className="column is-full">
            <div className="box">
              <h2 className="title is-4">Why We Created This App</h2>
              <p className="content">
                We developed this budget app with a simple goal in mind: to empower individuals to take control of their finances. In today's fast-paced world, managing money effectively has become more crucial than ever. Our app provides an intuitive platform for creating and maintaining budgets, helping users achieve their financial goals and build a secure future.
              </p>
            </div>
          </div>

          <div className="column is-half">
            <div className="box">
              <h2 className="title is-4">Who Can Use This App</h2>
              <p className="content">
                Our budget app is designed for everyone, regardless of their financial expertise:
              </p>
              <ul>
                <li>Students managing their allowance or part-time income</li>
                <li>Young professionals starting their financial journey</li>
                <li>Families looking to optimize their household expenses</li>
                <li>Retirees aiming to make the most of their savings</li>
                <li>Anyone who wants to gain better control over their finances</li>
              </ul>
            </div>
          </div>

          <div className="column is-half">
            <div className="box">
              <h2 className="title is-4">What and When to Use It</h2>
              <p className="content">
                Our app is perfect for:
              </p>
              <ul>
                <li>Creating monthly or annual budgets</li>
                <li>Tracking daily expenses</li>
                <li>Setting and monitoring financial goals</li>
                <li>Analyzing spending patterns</li>
                <li>Planning for major purchases or life events</li>
              </ul>
              <p className="content mt-4">
                Use it regularly to stay on top of your finances, or whenever you need to make important financial decisions. The more you use it, the better insights you'll gain into your financial habits!
              </p>
            </div>
          </div>
        </div>

        <div className="has-text-centered mt-6">
          <p className="is-size-5">
            Start your journey to financial freedom today with our Budget App!
          </p>
          <button className="button is-primary is-large mt-4"
          onClick={() => {
            navigate("/signup");
          }}>Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default About;
