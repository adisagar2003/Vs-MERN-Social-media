import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
  if (!isLoggedIn) {
    navigate("/");
  }
  return children;
};
export default ProtectedRoutes;
