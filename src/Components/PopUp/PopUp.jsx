import React, { useContext } from "react";
import "./PopUp.css";
import { FormContext } from "../../Context/FormContext";

const PopUp1 = ({ handleUpdate }) => {
  const {
    handleReverse,
    handleAprove,
    currentStage,
    option,
    setOption,
    popUp,
    setPopUp,
  } = useContext(FormContext);

  return (
    <div className="pop-up" onClick={() => setPopUp(false)}>
      <div className="pop-up-card">
        <h1>Are You Sure?</h1>
        <div className="btns">
          {option === 1 && (
            <button className="yes" onClick={e => handleAprove(e)}>
              Yes
            </button>
          )}
          {option === 2 && (
            <button className="yes" onClick={e => handleReverse(e)}>
              Yes
            </button>
          )}
          {option === 3 && (
            <button className="yes" onClick={e => handleUpdate(e)}>
              Yes
            </button>
          )}
          <button
            className="no"
            onClick={e => {
              e.preventDefault();
              setPopUp(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp1;
