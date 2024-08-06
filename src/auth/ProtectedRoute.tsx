import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { restoreLoginFromLocalStorage } from "../features/user/userSlice";

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const isTokenExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const decodedToken = getDecodedToken(token)
      const currentTime = Date.now() / 1000;
      return decodedToken.exp && decodedToken.exp < currentTime;
    } catch (error) {
      console.error(`Could not decode token: ${token}`);
      return true;
    }
  };

  const getDecodedToken = (token: string): JwtPayload => {
    const decodedToken = jwtDecode(token)
    return decodedToken
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      navigate("/login");
    }
    else {
        const decodedToken = getDecodedToken(token!!)
        dispatch(restoreLoginFromLocalStorage({token, username: decodedToken.username}))
    }
  });
  return <Outlet />;
};
