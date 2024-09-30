import useAxiosPrivate from "../Hooks/usePrivateAxios";

const FetchData = () => {
  const api = useAxiosPrivate();

  const fetchData = url => {
    console.log(localStorage.getItem("access"));
    return api.get(url);
  };

  return fetchData;
};

export default FetchData;
