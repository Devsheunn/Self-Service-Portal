import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import GetUserDetails from "../Components/GetUserDetails";
import useAxiosPrivate from "../Hooks/usePrivateAxios";
import { useParams } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Employees");
  const [status, setStatus] = useState(null);
  const api = useAxiosPrivate();
  const [paramID, setParamID] = useState(null);
  const [ispreview, setIsPreview] = useState(false);
  const [selectedEmployeesTemp2, setSelectedEmployeesTemp2] = useState([]);
  const [causeReRender, setCauseReRender] = useState(false);

  const handleErrorToast = message => {
    toast.error(message);
  };

  const handleSuccessToast = message => {
    toast.error(message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isLoading,
        setIsLoading,
        role,
        setRole,
        status,
        setStatus,
        paramID,
        setParamID,
        ispreview,
        setIsPreview,
        selectedEmployeesTemp2,
        setSelectedEmployeesTemp2,
        causeReRender,
        setCauseReRender,
        handleErrorToast,
        handleSuccessToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
