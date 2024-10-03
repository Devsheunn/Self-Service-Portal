import { useState, useEffect, useContext, useRef } from "react";
import { assets } from "../../assets/assets";
import SearchResult from "../SearchResult/SearchResult";
import "./Search.css";
import { FormContext } from "../../Context/FormContext";
import DatePicker from "react-multi-date-picker";
import SelectedEmployees from "../SelectedEmployees/SelectedEmployees";
import Icon from "react-multi-date-picker/components/icon";
import GetData from "../GetData";

const Search = ({ selectedEmployeesTemp }) => {
  let toformat = false;
  const getData = GetData();
  const {
    searchBarActive,
    setSearchBarActive,
    userInput,
    setUserInput,
    setSelectedEmployeesTemp,
    handleOnDelete,
    dateValue,
    setDateValue,
    dataValue,
    selectionComplete,
    setSelectionComplete,
    Toaster,
    canProceed,
    setCanProceed,
    setData,
    isEdit,
  } = useContext(FormContext);

  const handleAddEmployeesDone = e => {
    if (e.target === e.currentTarget) {
      setSearchBarActive(false);
    } else return;
  };

  const convertDates = dateArray => {
    const parsedDates = dateArray.map(item => {
      const parts = item.date.split("-");
      return new Date(parts[1], parts[0], parts[2]); // Year, Month (0-based), Day
    });
    return parsedDates;
  };

  const handleDateChange = (dates, data, i) => {
    setSelectedEmployeesTemp(prev =>
      prev.map(item => {
        if (item.id === data.id) {
          const updatedDates = [...item.dates];

          // if (dates === null) {
          //   updatedDates.push(null);
          // } else {
          //   updatedDates[i] = dates;
          // }
          return { ...item, dates: dates };
        }
        return item;
      })
    );

    if (dates.length === 0) {
      setCanProceed(false);
    } else {
      setCanProceed(true);
    }
  };

  const datePickerRef = useRef();

  useEffect(() => {
    getData("api/users/", setData);
  }, []);

  return (
    <div
      className={
        searchBarActive
          ? "search-container-active search-container"
          : "search-container"
      }
      onClick={e => {
        handleAddEmployeesDone(e);
      }}
    >
      <div className="search-bar">
        <div className="close">
          <img
            src={assets.close}
            alt=""
            onClick={e => handleAddEmployeesDone(e)}
          />
        </div>
        <h1>Search For Employee</h1>

        <div className="search-box">
          <input
            placeholder="Enter Employee's Detail"
            type="text"
            value={userInput}
            onInput={e => setUserInput(e.target.value)}
          />
          <img src={assets.searchIcon} alt="" />
          {userInput === "" ? null : <SearchResult />}
        </div>

        <div className="initial-selectOnSearch">
          {selectedEmployeesTemp?.length > 0 ? (
            selectedEmployeesTemp.map((item, i) => {
              return (
                <>
                  <div key={i} className="name-calender">
                    <div>
                      <p>
                        {item?.first_name} {item?.last_name}
                      </p>
                      <p>{item?.id.toString().padStart(3, "0")}</p>
                    </div>
                    <div
                      onChange={e => {
                        if (e.target.classList.contains("custom-calendar")) {
                          console.log("e reach me o");
                        }
                      }}
                      className="date-calender"
                    >
                      <DatePicker
                        multiple
                        value={
                          item.dates[0]?.hasOwnProperty("date")
                            ? convertDates(item.dates)
                            : item.dates
                        }
                        onChange={dates => {
                          handleDateChange(dates, item, i);
                        }}
                        className="custom-calendar"
                        format="MMM DD"
                        ref={datePickerRef}
                        // render={
                        //   <img
                        //     key={item.id}
                        //     onClick={() => datePickerRef.current.openCalendar()}
                        //     src={assets.calender}
                        //     alt=""
                        //   />
                        // }
                      />
                      <img
                        onClick={() => {
                          handleOnDelete(item.id);
                        }}
                        src={assets.trash}
                        alt="delete-icon"
                      />
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="no-selection">No employee selected yet...</div>
          )}
        </div>
        {selectedEmployeesTemp?.length > 0 && canProceed ? (
          <button
            onClick={e => {
              handleAddEmployeesDone(e);
              setSelectionComplete(true);
            }}
            className="proceed-btn"
          >
            Proceed
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
