import "./InconvenienceAllForm.css";
import { assets } from "../../assets/assets";
import SelectedEmployees from "../SelectedEmployees/SelectedEmployees";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../../Context/FormContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Loader from "../Loader/Loader";
import useAxiosPrivate from "../../Hooks/usePrivateAxios";

const InconvenienceAllForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { setIsPreview, setIsLoading } = useContext(AuthContext);
  const api = useAxiosPrivate();
  const [naPreview, setnPreview] = useState(true);

  setIsPreview(false);
  const {
    setSearchBarActive,
    selectionComplete,
    selectedEmployeesTemp,
    setSelectionComplete,
    selectedEmployeesTemp2,
    formData,
    setFormData,
    navID,
    setNavID,
    arrayToPost,
    popUp,
    setPopUp,
    option,
    setOption,
  } = useContext(FormContext);
  const navigate = useNavigate();

  const handleAddEmployees = e => {
    e.preventDefault();
    setSearchBarActive(true);
    setSelectionComplete(false);
  };

  const handlechange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const asyncReturnTwo = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2); // Resolves with the value 2 after 1 second
      }, 5000); // 1-second delay
    });
  };

  console.log(arrayToPost);

  const handleSave = async e => {
    e.preventDefault();
    setIsLoading(true);
    setFormData(prevState => ({
      ...prevState,
      selected: arrayToPost,
    }));

    try {
      const response = await api.post(`api/inconvenience-requests/`, {
        title: formData.title,
        description: formData.description,
      });

      console.log(response.data);
      const ID = response.data.id;
      setNavID(response.data.id);

      const response2 = await api.post(
        `api/inconvenience-request-lines/${response.data.id}/`,
        arrayToPost
      );

      // const id = await asyncReturnTwo(); // Await the async function
      navigate(`/inconvenience-allowance/${response.data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {});

  return (
    <>
      <Loader />
      <div className="allowance-form">
        <div className="form-container">
          <h1>Inconvenience Allowance Form</h1>
          <div className="form-main">
            <div className="current">
              <img src={assets.formIcon} alt="" />
              <h2>Form</h2>
            </div>
            <form action="/">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData?.title}
                id="title"
                required
                onChange={e => {
                  handlechange(e);
                }}
              />
              <label htmlFor="description">Job Description</label>
              <textarea
                name="description"
                id="description"
                value={formData?.description}
                required
                onChange={e => {
                  handlechange(e);
                }}
              ></textarea>

              <SelectedEmployees
                selectedEmployeesTemp={selectedEmployeesTemp}
              />

              <div className="btns">
                {!selectionComplete ? (
                  <button
                    className="btn"
                    type="add"
                    onClick={handleAddEmployees}
                  >
                    Add Employees
                  </button>
                ) : (
                  <button
                    className="btn"
                    type="add"
                    onClick={handleAddEmployees}
                  >
                    Edit Selection
                  </button>
                )}

                <br />

                {selectionComplete && selectedEmployeesTemp.length > 0 ? (
                  <button
                    className="btn"
                    // type="submit"
                    onClick={e => {
                      handleSave(e);
                    }}
                  >
                    Save
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InconvenienceAllForm;
