import React, { useContext, useEffect } from "react";
import "./FormPreviewPage.css";
import { assets } from "../../assets/assets";
import StatusBar from "../SrarusBar/StatusBar";
import SelectedEmployees from "../SelectedEmployees/SelectedEmployees";
import FormContextProvider, { FormContext } from "../../Context/FormContext";
import Header from "../Header/Header";
import GetUserDetails from "../GetUserDetails";
import { Navigate, useNavigate } from "react-router-dom";

const ProgressPage = () => {
  const { formData, user, setPreview, handleCreate } = useContext(FormContext);
  const now = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = now.toLocaleDateString("en-GB", options);

  const getUser = GetUserDetails();
  useEffect(() => {
    getUser();
  }, []);

  console.log(formData);

  return (
    <>
      {/* <Header /> */}
      <div className="form-preview-container">
        <StatusBar />
        <div className="details">
          <h1>Form Preview</h1>
          <div className="preview-main">
            <div className="current">
              <img src={assets.formIcon} alt="" />
              <h2>Preview</h2>
            </div>
            <div className="preview-job-info">
              <p className="department">Electrical Electronics Department</p>
              <h1 className="preview-title">{formData?.title} </h1>
              <p className="preview-description">{formData?.description}</p>
              <div className="extra-details">
                <p className="it">Status: Draft</p>
                <p className="it">Created: {formattedDate}</p>
                <p className="it">
                  Created By: {`Engr ${user?.first_name} ${user?.last_name}`}
                </p>
              </div>
            </div>

            <SelectedEmployees />

            <div className="btns">
              <button
                className="btn"
                onClick={e => {
                  e.preventDefault();
                  // navigate(-1);
                  setPreview(false);
                }}
              >
                Edit
              </button>
              <button
                className="btn"
                onClick={e => {
                  handleCreate(e);
                  setPreview(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressPage;
