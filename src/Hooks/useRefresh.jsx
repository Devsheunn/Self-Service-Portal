import PublicApi from "../Utils/axios";
import useAuth from "./UseAuth";
import useAxiosPrivate from "./usePrivateAxios";
import { PrivateApi } from "../Utils/axios";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const useRefreshToken = () => {
  const { refreshToken } = useContext(AuthContext);

  const refresh = async () => {
    console.log(refreshToken);
    const response = await PublicApi.post("api/users/token/refresh/", {
      refresh: refreshToken,
    });
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;
