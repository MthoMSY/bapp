import { Budget } from "../types/budget";

const About = () => {
  const budgets: Budget[] = [];
  const getType = (): string => {
    const num = Math.floor(Math.random() * 2);
    if (num == 0) return "Strict";
    return "Flexible";
  };
  return <div>About</div>;
};

export default About;
