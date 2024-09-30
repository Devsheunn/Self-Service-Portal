import { useContext, useState } from "react";
import useAxiosPrivate from "../Hooks/usePrivateAxios";
import AuthContext from "../Context/AuthContext";
import { FormContext } from "../Context/FormContext";

const GetData = () => {
  const api = useAxiosPrivate();
  const { setIsLoading } = useContext(AuthContext);
  const { isPending, setIsPending } = useContext(FormContext);
  const getData = async (url, setData) => {
    try {
      const res = await api.get(url);
      setData(res.data);
      console.log("worked");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    setIsPending(false);
  };

  return getData;
};

export default GetData;
