import { useContext, useEffect } from "react";
import useRefreshToken from "./useRefresh";
import { PrivateApi } from "../Utils/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const token = localStorage.getItem("access");

  console.log(token);

  useEffect(() => {
    const requestIntercept = PrivateApi.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = PrivateApi.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return PrivateApi(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      PrivateApi.interceptors.request.eject(requestIntercept);
      PrivateApi.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return PrivateApi;
};

export default useAxiosPrivate;
