// import "./InconvenienceAllForm.css";
import { assets } from "../../assets/assets";
import SelectedEmployees from "../SelectedEmployees/SelectedEmployees";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../../Context/FormContext";
import Header from "../Header/Header";
import StatusBar from "../SrarusBar/StatusBar";
import { useParams } from "react-router-dom";
import FlowButons from "../FlowButtons/FlowButons";
import Loader from "../Loader/Loader";
import AuthContext from "../../Context/AuthContext";
import FetchData from "../FetchData";
import "./PreviewPage.css";
import PopUp from "../PopUp/PopUp";
import PopUp1 from "../PopUp/PopUp";

const PreviewPage = () => {
  const fetchData = FetchData();
  const param = useParams();
  const [description, setDescription] = useState();
  const [isPreview, setIsPreview] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const {
    setSearchBarActive,
    selectionComplete,
    selectedEmployeesTemp,
    setSelectedEmployeesTemp,
    setSelectionComplete,
    formData,
    setFormData,
    handleCreate,
    preview,
    datatoEdit,
    setDatatoEdit,
    fetchPreviewData,
    popUp,
    setPopUp,
  } = useContext(FormContext);

  const {
    isLoading,
    setIsLoading,
    setStatus,
    status,
    stages,
    handleReverse,
    handleAprove,
    currentStage,
    setParamID,
    paramID,
    ispreview,
    selectedEmployeesTemp2,
    setSelectedEmployeesTemp2,
    setUser,
    causeReRender,
    setCauseReRender,
  } = useContext(AuthContext);

  // useEffect(() => {
  // setIsPreview(true);
  // });

  const handlechange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [Data, Own] = await Promise.all([
          fetchData(`api/inconvenience-requests/${param.id}/`),
          fetchData("api/users/own/"),
        ]);

        setUser(Own.data);
        setDatatoEdit(Data.data);
        const selected = Data.data.lines?.map(data => {
          const { employee: id, employee_name: first_name, days: dates } = data;
          const newObject = { id, first_name, dates };
          return newObject;
        });
        setParamID(param.id);
        setSelectedEmployeesTemp2(selected);
        setSelectionComplete(true);
        setStatus(Data.data.status);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(localStorage.getItem("access"));
    // fetchPreviewData(
    //   `api/inconvenience-requests/${param.id}/`,
    //   "api/users/own/"
    // );
    fetchAllData();
    setParamID(param.id);
  }, []);

  console.log(datatoEdit);
  console.log(selectedEmployeesTemp2);

  return (
    <>
      <Header />
      <div className="inconvenienceAllPage-container preview">
        <StatusBar isPreview={isPreview} />
        {popUp && <PopUp1 />}
        {!isLoading ? (
          <div className="allowance-form">
            <div className="form-container">
              <h1>Inconvenience Allowance Form</h1>
              <div className="form-main">
                <div className="current">
                  <img src={assets.formIcon} alt="" />
                  <h2>Preview</h2>
                </div>
                <form action="/">
                  <label htmlFor="title">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={datatoEdit?.title}
                    id="title"
                    required
                    onChange={e => {
                      handlechange(e);
                    }}
                    disabled
                  />
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    name="description"
                    id="description"
                    value={datatoEdit?.description}
                    required
                    onChange={e => {
                      handlechange(e);
                      setDescription(e.target.value);
                    }}
                    disabled
                  ></textarea>

                  <SelectedEmployees
                    selectedEmployeesTemp={selectedEmployeesTemp2}
                    isPreview={isPreview}
                  />

                  <FlowButons />
                </form>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PreviewPage;
