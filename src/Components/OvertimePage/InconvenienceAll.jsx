import { useState, useEffect, useContext } from "react";
import Table from "../Table/Table";
import "./InconvenienceAll.css";
import { assets } from "../../assets/assets";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import GetData from "../GetData";
import GetUserDetails from "../GetUserDetails";
import { FormContext } from "../../Context/FormContext";
import Loader from "../Loader/Loader";
import FetchData from "../FetchData";

const InconvenienceAll = () => {
  const navigate = useNavigate();
  const { data, setData, isPending, setIsPending } = useContext(FormContext);
  const { user, setActiveLink } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [toggleTabs, setToggleTabs] = useState(1);
  const [isMyAccoount, setIsMyAccount] = useState(true);
  const getUser = GetUserDetails();
  const getData = GetData();
  const [ownData, setOwnData] = useState([]);
  const [deptRec, setDeptRec] = useState([]);
  console.log(error);

  const fetchData = FetchData();

  const handleToggle = i => {
    setToggleTabs(i);
    if (i !== 1) {
      setIsMyAccount(false);
    } else {
      setIsMyAccount(true);
    }
  };

  const handleClick = url => {
    navigate(url);
  };

  const column1 = [
    {
      name: "Job ID",
      selector: row => row.inconvenience_request,
      sortable: true,
    },
    {
      name: "Job Description",
      selector: row => row.job_description,
    },
    {
      name: "Attendance",
      selector: row => row.attendance_status,
      conditionalCellStyles: [
        {
          when: row => row.attendance_status === "present",
          classNames: ["iscomplete", "status"],
        },
        {
          when: row => row.attendance_status === "pending",
          classNames: ["in-progress", "status"],
        },
        {
          when: row => row.attendance_status === "absent",
          classNames: ["declined", "status"],
        },
      ],
    },
    {
      name: "Date",
      selector: row => {
        const date = new Date(row.created_at);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long", // You can use 'short' or 'numeric'
          day: "numeric",
        });
        return formattedDate;
      },
      sortable: true,
    },
  ];

  const column2 = [
    // "draft",
    // "submitted",
    // "manager_approved",
    // "work_done",
    // "hr_approval",
    // "completed",

    {
      name: "Job ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Request ID",
      selector: row => row.request_id,
      sortable: true,
    },
    {
      name: "Job Description",
      selector: row => row.description,
    },
    {
      name: "Attendance",
      selector: row => row.status,
      conditionalCellStyles: [
        {
          when: row => row.status === "completed",
          classNames: ["iscomplete", "status"],
        },
        {
          when: row => row.status === "draft",
          classNames: ["in-progress", "status"],
        },
        {
          when: row => row.status === "manager_approved",
          classNames: ["declined", "status"],
        },
        {
          when: row => row.status === "work_done",
          classNames: ["declined", "status"],
        },
        {
          when: row => row.status === "hr_approval",
          classNames: ["declined", "status"],
        },
        {
          when: row => row.status === "submitted",
          classNames: ["declined", "status"],
        },
      ],
    },
    {
      name: "Date",
      selector: row => {
        const date = new Date(row.created_at);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long", // You can use 'short' or 'numeric'
          day: "numeric",
        });
        return formattedDate;
      },
      sortable: true,
    },
  ];

  // useEffect(() => {
  //   setIsPending(true);
  //   getData("api/inconvenience-request-lines/own/", setOwnData);
  //   getData("api/inconvenience-requests/", setDeptRec);
  //   getData("api/users/", setData);
  //   getUser();
  //   console.log(deptRec);
  //   console.log(ownData);
  // }, []);

  useEffect(() => {
    setActiveLink(2);
    const fetchAllData = async () => {
      console.log("fetalldata started");
      setIsPending(true);
      try {
        const [Own, Dept] = await Promise.all([
          fetchData("api/inconvenience-request-lines/own/"),
          fetchData("api/inconvenience-requests/"),
        ]);

        setOwnData(Own.data);
        setDeptRec(Dept.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchAllData();
    getUser();
  }, []);

  let stringifiedData1Array = ownData.map(obj => {
    let newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = String(obj[key]);
      }
    }
    return newObj;
  });

  let stringifiedData2Array = deptRec.map(obj => {
    let newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = String(obj[key]);
      }
    }
    return newObj;
  });

  return (
    <>
      <Header />
      <div className="inconvenience-allowance-container">
        <h1>INCONVENIENCE ALLOWANCE</h1>
        <div className="tabs">
          <div
            onClick={() => handleToggle(1)}
            className={toggleTabs === 1 ? "active tab" : "tab"}
          >
            My Account
          </div>
          {user?.groups.length > 1 ? (
            <div
              onClick={() => handleToggle(2)}
              className={toggleTabs === 2 ? "active tab" : "tab"}
            >
              Department(s)
            </div>
          ) : null}
        </div>

        <section className="main">
          {isMyAccoount ? (
            <div className="tab-1-content">
              <h1 className="history">History</h1>
              <Table
                columns={column1}
                data={stringifiedData1Array}
                error={error}
              />
            </div>
          ) : (
            <div className="tab-2-content">
              <button
                onClick={() => handleClick("/inconvenience-allowance/form")}
              >
                New Request
              </button>
              <Table
                columns={column2}
                data={stringifiedData2Array}
                error={error}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default InconvenienceAll;
