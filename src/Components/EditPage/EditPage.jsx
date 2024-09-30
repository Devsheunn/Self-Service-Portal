// import "./InconvenienceAllForm.css";
import { assets } from "../../assets/assets";
import SelectedEmployees from "../SelectedEmployees/SelectedEmployees";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../../Context/FormContext";
import Header from "../Header/Header";
import StatusBar from "../SrarusBar/StatusBar";
import { useNavigate, useParams } from "react-router-dom";
import FlowButons from "../FlowButtons/FlowButons";
import Loader from "../Loader/Loader";
import AuthContext from "../../Context/AuthContext";
import FetchData from "../FetchData";
import Search from "../Search/Search";
import useAxiosPrivate from "../../Hooks/usePrivateAxios";

const EditPage = () => {
  const fetchData = FetchData();
  const api = useAxiosPrivate();
  const navigate = useNavigate();
  const param = useParams();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [naPreview, setnPreview] = useState(true);
  const [isPreview, setIsPreview] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

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
    arrayToPost,
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

  const handlechange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleAddEmployees = e => {
    e.preventDefault();
    setSearchBarActive(true);
    // setSelectionComplete(false);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setIsLoading(true);
    setFormData(prevState => ({
      ...prevState,
      selected: arrayToPost,
    }));

    try {
      const response = await api.put(`api/inconvenience-requests/${paramID}/`, {
        title: title,
        description: description,
      });

      const response2 = await api.post(
        `api/inconvenience-request-lines/${paramID}/`,
        arrayToPost
      );

      // const id = await asyncReturnTwo(); // Await the async function
      navigate(`/inconvenience-allowance/${paramID}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        console.log(Data.data);
        setDatatoEdit(Data.data);
        setTitle(Data.data.title);
        setDescription(Data.data.description);
        const selected = Data.data.lines?.map(data => {
          const {
            id: line_id,
            employee: id,
            employee_name: first_name,
            days: dates,
          } = data;
          const newObject = { id, first_name, dates, line_id };
          console.log(newObject);

          return newObject;
        });
        setParamID(param.id);
        setSelectedEmployeesTemp(selected);
        console.log(selectedEmployeesTemp);
        setSelectionComplete(true);
        setStatus(Data.data.status);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
    setParamID(param.id);
  }, []);

  console.log(datatoEdit);
  console.log(selectedEmployeesTemp2);

  return (
    <>
      <Header />
      <Search selectedEmployeesTemp={selectedEmployeesTemp} />
      <div className="inconvenienceAllPage-container">
        <StatusBar isPreview={isPreview} />
        {!isLoading ? (
          <div className="allowance-form">
            <div className="form-container">
              <h1>Inconvenience Allowance Form</h1>
              <div className="form-main">
                <div className="current">
                  <img src={assets.formIcon} alt="" />
                  <h2>Edit</h2>
                </div>
                <form action="/">
                  <label htmlFor="title">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    id="title"
                    required
                    onChange={e => {
                      setTitle(e.target.value);
                    }}
                  />
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    required
                    onChange={e => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>

                  <SelectedEmployees
                    selectedEmployeesTemp={selectedEmployeesTemp}
                    isPreview={isPreview}
                    isEdit={isEdit}
                  />

                  <div className="btns">
                    <button
                      className="btn"
                      type="add"
                      onClick={e => {
                        handleAddEmployees(e);
                      }}
                    >
                      Edit Selection
                    </button>

                    <br />

                    <button
                      className="btn"
                      // type="submit"
                      onClick={e => {
                        handleUpdate(e);
                      }}
                    >
                      Update
                    </button>
                  </div>
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

export default EditPage;
