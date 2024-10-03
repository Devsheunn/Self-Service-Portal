import { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
import useAxiosPrivate from "../Hooks/usePrivateAxios";
import FetchData from "../Components/FetchData";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";

export const FormContext = createContext();
const FormContextProvider = props => {
  // Variables
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [selectionComplete, setSelectionComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedEmployeesTemp, setSelectedEmployeesTemp] = useState([]);
  const [dateValue, setDateValue] = useState({});
  const [canProceed, setCanProceed] = useState(false);
  const api = useAxiosPrivate();
  const [formData, setFormData] = useState({ selected: [] });
  const [preview, setPreview] = useState(true);
  const [navID, setNavID] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const fetchData = FetchData();
  const [datatoEdit, setDatatoEdit] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [option, setOption] = useState(null);

  const {
    isLoading,
    setIsLoading,
    setStatus,
    status,
    setParamID,
    paramID,
    ispreview,
    setIsPreview,
    selectedEmployeesTemp2,
    setSelectedEmployeesTemp2,
    setUser,
    causeReRender,
    setCauseReRender,
  } = useContext(AuthContext);
  let arrayToPost = [];

  const stages = [
    "draft",
    "submitted",
    "manager_approved",
    "work_done",
    "hr_approval",
    "completed",
  ];

  // Functions
  const handleOnDelete = dataId => {
    setSelectedEmployeesTemp(prev => prev.filter(item => item.id !== dataId));
  };

  const notifySuccess = message => {
    toast.success(message);
  };

  const handleCreate = async e => {
    e.preventDefault();
  };

  const fetchPreviewData = async (url1, url2) => {
    setIsLoading(true);
    try {
      const [Data, Own] = await Promise.all([fetchData(url1), fetchData(url2)]);

      setUser(Own.data);
      setDatatoEdit(Data.data);
      const selected = Data.data.lines?.map(data => {
        const { id: staff_id, employee_name: first_name, days: dates } = data;
        const newObject = { staff_id, first_name, dates };
        return newObject;
      });
      setSelectedEmployeesTemp2(selected);
      setSelectionComplete(true);
      setStatus(Data.data.status);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStagePost = async num => {
    console.log(currentStage);
    setIsLoading(true);
    try {
      const res = await api.post(
        `api/inconvenience-requests/${paramID}/transition-status/`,
        {
          status: `${stages[stages.indexOf(status) + num]}`,
        }
      );

      await fetchPreviewData(
        `api/inconvenience-requests/${paramID}/`,
        "api/users/own/"
      );
      notifySuccess("Successful");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleAprove = e => {
    e.preventDefault();
    setPopUp(false);
    const currentIndex = stages.indexOf(status);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
      handleStagePost(1);
    }
  };

  const handleReverse = e => {
    e.preventDefault();
    setPopUp(false);
    const currentIndex = stages.indexOf(status);
    if (currentIndex > 0) {
      setCurrentStage(stages[currentIndex - 1]);
      handleStagePost(-1);
    }
  };

  useEffect(() => {
    setFilteredData(
      data.filter(data =>
        data.first_name.toLowerCase().includes(userInput.toLowerCase())
      )
    );
  }, [data, userInput]);

  // Exported Values
  const FormContextValue = {
    searchBarActive,
    setSearchBarActive,
    selectedEmployeesTemp,
    setSelectedEmployeesTemp,
    filteredData,
    setFilteredData,
    data,
    setData,
    userInput,
    setUserInput,
    handleOnDelete,
    dateValue,
    setDateValue,
    selectionComplete,
    setSelectionComplete,
    canProceed,
    setCanProceed,
    handleCreate,
    formData,
    setFormData,
    arrayToPost,
    preview,
    setPreview,
    navID,
    setNavID,
    isPending,
    setIsPending,
    handleAprove,
    handleReverse,
    fetchPreviewData,
    stages,
    datatoEdit,
    setDatatoEdit,
    isEdit,
    setIsEdit,
    popUp,
    setPopUp,
    option,
    setOption,
    notifySuccess,
  };

  return (
    <FormContext.Provider value={FormContextValue}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
