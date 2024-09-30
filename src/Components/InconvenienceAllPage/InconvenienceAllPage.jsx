import "./InconvenienceAllPage.css";
import StatusBar from "../SrarusBar/StatusBar";
import InconvenienceAllForm from "../InconvenienceAllForm/InconvenienceAllForm";
import Search from "../Search/Search";
import FormContextProvider, { FormContext } from "../../Context/FormContext";
import Header from "../Header/Header";
import { useContext, useEffect } from "react";
import GetUserDetails from "../GetUserDetails";

const InconvenienceAllPage = () => {
  const getUser = GetUserDetails();
  const { selectedEmployeesTemp } = useContext(FormContext);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Header />
      <div className="inconvenienceAllPage-container">
        <StatusBar />
        <InconvenienceAllForm />
        <Search selectedEmployeesTemp={selectedEmployeesTemp} />
      </div>
    </>
  );
};

export default InconvenienceAllPage;
