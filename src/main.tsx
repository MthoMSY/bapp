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
import { Budgets } from "./components/budget/Budgets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/:username/budget",
            element: <Budgets />,
          },
          {
            path: "/budget/:budgetName/items",
            element: <BudgetItems />,

          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
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
