import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { PageNotFound } from "./components/PageNotFound";
import { BudgetItems } from "./components/budget/BudgetItems";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { BudgetsDashboard } from "./components/budget/BudgetsDashboard";
import { Home } from "./components/Home";
import About from "./components/About";
import { Blogs } from "./components/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ":username/budgets",
            element: <BudgetsDashboard />,
          },
          {
            path: "budget/:budgetName/items",
            element: <BudgetItems />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
