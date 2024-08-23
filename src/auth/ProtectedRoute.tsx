import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { restoreLoginFromLocalStorage } from "../features/user/userSlice";

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getDecodedToken = (
    token: string | null
  ): { isExpired: boolean; payload: JwtPayload } => {
    const expiredResult = { isExpired: true, payload: {} };
    if (!token) return expiredResult;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const isExpired = decodedToken.exp && decodedToken.exp < currentTime;

      if (isExpired) {
        return { isExpired: true, payload: {} };
      }

      return { isExpired: false, payload: decodedToken };
    } catch (error) {
      console.error(`Could not decode token: ${token}: \n ${error}`);
      return expiredResult;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = getDecodedToken(token);
    if (decodedToken.isExpired) {
      navigate("/login");
    } else {
      dispatch(
        restoreLoginFromLocalStorage({ token, ...decodedToken.payload })
      );
    }
  });
  return <Outlet />;
};
