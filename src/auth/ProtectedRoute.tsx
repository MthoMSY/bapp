import { useEffect } from "react";
import { useAppSelector } from "../hooks/redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });
  return <Outlet />;
};
