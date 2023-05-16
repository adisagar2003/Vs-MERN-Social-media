import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }: any) => {
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
export default Protected;
