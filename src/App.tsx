import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

const loggedIn = false;
function App() {
  return (
    <div className="App">
      <div className="section">
        <h1 className="title has-text-centered">Easy budget App</h1>
      </div>
      <section className="section">
        {loggedIn ? <Dashboard /> : <SignUp />}
      </section>
    </div>
  );
}

export default App;
