import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const token = localStorage.getItem("access");

  if (loading) {
    return <div>Loading</div>;
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
