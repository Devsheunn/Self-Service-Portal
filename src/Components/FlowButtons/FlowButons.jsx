import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import { FormContext } from "../../Context/FormContext";
import { useNavigate } from "react-router-dom";

const FlowButons = () => {
  const { role, status, user } = useContext(AuthContext);
  const { handleReverse, handleAprove, currentStage } = useContext(FormContext);

  const [cases, setCases] = useState("");
  console.log(status);
  console.log(currentStage);

  const roles = roles => {
    const DR = ["Department Representatives", "Employees"];
    const LM = ["Employees", "Line Managers"];
    const HR = ["Employees", "HR"];
    const EM = ["Employees"];
    const arraysEqual = (arr1, arr2) => {
      console.log(JSON.stringify(arr1?.sort()) == JSON.stringify(arr2?.sort()));
      return JSON.stringify(arr1?.sort()) === JSON.stringify(arr2?.sort());
    };

    if (arraysEqual(roles, DR)) return "DR";
    else if (arraysEqual(roles, LM)) return "LM";
    else if (arraysEqual(roles, HR)) return "HR";
    else if (arraysEqual(roles, EM)) return "EM";
    else return "lol";
  };

  useEffect(() => {
    console.log("fuct ran");
    setCases(roles(user?.groups));
    console.log(cases);
  }, [user]);

  console.log(cases);

  switch (cases) {
    case "DR":
      return <DeptRep status={status} />;
    case "LM":
      return <LineManager status={status} />;
    case "HR":
      return <HRView status={status} />;
    case "EM":
      return <Employee />;
    default:
      return <div>Access Denied</div>;
  }
};

const DeptRep = ({ status }) => {
  const {
    handleReverse,
    handleAprove,
    currentStage,
    popUp,
    setPopUp,
    option,
    setOption,
  } = useContext(FormContext);
  const { paramID } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="btns">
      {status === "draft" && (
        <>
          <button
            className="btn"
            type="add"
            onClick={e => {
              e.preventDefault();
              navigate(`/inconvenience-allowance/edit/${paramID}`);
            }}
          >
            Edit
          </button>
          <button
            className="btn"
            onClick={e => {
              e.preventDefault();
              setOption(1);
              setPopUp(true);
            }}
          >
            Submit
          </button>
        </>
      )}

      {status === "submitted" && null}
      {status === "manager_approved" && (
        <>
          <button
            className="btn"
            type="add"
            onClick={e => {
              e.preventDefault();
              navigate(`/inconvenience-allowance/edit/${paramID}`);
            }}
          >
            Edit
          </button>
          {/* <button className="btn" onClick={e => handleAprove(e)}>
            {null}
          </button> */}
        </>
      )}
      {status === "work_done" && null}
      {status === "hr_approval" && null}
      {status === "completed" && null}
    </div>
  );
};

const LineManager = ({ status }) => {
  const {
    handleReverse,
    handleAprove,
    currentStage,
    popUp,
    setPopUp,
    option,
    setOption,
  } = useContext(FormContext);
  const navigate = useNavigate();
  const { paramID } = useContext(AuthContext);

  return (
    <div className="btns">
      {status === "draft" && null}

      {status === "submitted" && (
        <>
          <button
            className="btn"
            type="add"
            onClick={e => {
              e.preventDefault();
              setOption(2);
              setPopUp(true);
              navigate(`/inconvenience-allowance`);
            }}
          >
            Reverse
          </button>
          <button
            className="btn"
            onClick={e => {
              e.preventDefault();
              setOption(1);
              setPopUp(true);
            }}
          >
            Approve
          </button>
        </>
      )}
      {status === "manager_approved" && (
        <>
          <button
            className="btn"
            type="add"
            onClick={e => {
              e.preventDefault();
              navigate(`/inconvenience-allowance/edit/${paramID}`);
            }}
          >
            Edit
          </button>
          <button
            className="btn"
            onClick={e => {
              e.preventDefault();
              setOption(1);
              setPopUp(true);
            }}
          >
            Approve
          </button>
        </>
      )}
      {status === "work_done" && null}
      {status === "hr_approval" && null}
      {status === "completed" && null}
    </div>
  );
};

const HRView = ({ status }) => {
  const { handleReverse, handleAprove, currentStage, setPopUp, setOption } =
    useContext(FormContext);

  return (
    <div className="btns">
      {status === "draft" && null}

      {status === "submitted" && null}
      {status === "manager_approved" && null}
      {status === "work_done" && (
        <>
          <button className="btn" type="add">
            Reject
          </button>
          <button
            className="btn"
            onClick={e => {
              e.preventDefault();
              setOption(1);
              setPopUp(true);
            }}
          >
            Approve
          </button>
        </>
      )}
      {status === "hr_approval" && null}
      {status === "completed" && null}
    </div>
  );
};

const Employee = () => {
  return null;
};

export default FlowButons;
