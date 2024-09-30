import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./SelectedEmployees.css";
import { FormContext } from "../../Context/FormContext";
import AuthContext from "../../Context/AuthContext";
import { useParams } from "react-router-dom";

const SelectedEmployees = ({ selectedEmployeesTemp, isEdit, isPreview }) => {
  const { selectionComplete, formData, arrayToPost } = useContext(FormContext);
  const { ispreview } = useContext(AuthContext);
  const param = useParams();
  console.log(param);
  console.log(selectedEmployeesTemp);

  const formatPostDates = datesArray => {
    console.log(datesArray);
    return datesArray?.map(date => {
      console.log(date, typeof date);
      const formattedDate = new Date(date).toISOString().split("T")[0];
      console.log(formattedDate);
      return formattedDate;
    });
  };

  const formatDisplayDate = datesArray => {
    return datesArray?.map(date => {
      console.log(date);
      if (isPreview && date.hasOwnProperty("date")) {
        console.log(ispreview, "so i ran the normal");
        const formattedDate = new Date(date.date).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
        });

        return formattedDate;
      } else {
        console.log(ispreview, "so i ran the calender");
        return date;
      }
    });
  };

  const formatDisplayDate2 = datesArray => {
    return datesArray?.map(date => {
      console.log(date);
      console.log(ispreview, "so i ran the normal");
      const formattedDate = new Date(date.date).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      });

      return formattedDate;
    });
  };

  console.log("array to post", arrayToPost);

  return (
    <div className="SelectedEmployees-container">
      {selectedEmployeesTemp?.length > 0 && selectionComplete ? (
        <h1>Selected Employees</h1>
      ) : null}
      {selectedEmployeesTemp?.length > 0 && selectionComplete
        ? selectedEmployeesTemp?.map((item, i) => {
            console.log(item);
            console.log(item.dates, "dates object");
            // console.log(item.staff_id);
            console.log(isPreview);
            console.log(isEdit);

            if (!isPreview) {
              console.log("array to post ran");
              arrayToPost[i] = {
                employee: item.id,
                response: "pending",
                dates: formatPostDates(item.dates),
              };
            }

            if (isEdit) {
              console.log("we can proceed");
              if (item.dates[0]?.hasOwnProperty("date")) {
                arrayToPost[i] = {
                  id: item.line_id,
                  employee: item.id,
                  response: "pending",
                  dates: item.dates.map(item => item.date),
                };
              } else {
                arrayToPost[i] = {
                  employee: item.id,
                  response: "pending",
                  dates: formatPostDates(item.dates),
                };
              }
            }

            console.log(formData);
            console.log(arrayToPost);
            console.log("i got here");
            return (
              <div key={i} className="employee-job-details">
                <p className="id">{item.id}</p>
                <p className="name">
                  {item.first_name} {item.last_name}
                </p>
                <p className="dates">
                  {formatDisplayDate(item.dates).join(", ")}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SelectedEmployees;
