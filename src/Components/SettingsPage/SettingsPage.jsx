import { useEffect, useState } from "react";
import "./SettingsPage.css";
import { assets } from "../../assets/assets";
import Table from "../Table/Table";

const SettingsPage = () => {
  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Department",
      selector: row => row.department,
    },
    {
      name: "Title",
      selector: row => row.title,
    },
    {
      name: "Status",
      selector: row => row.status,
      conditionalCellStyles: [
        {
          when: row => row.status === "complete",
          classNames: ["iscomplete", "status"],
        },
        {
          when: row => row.status === "in-progress",
          classNames: ["in-progress", "status"],
        },
        {
          when: row => row.status === "declined",
          classNames: ["declined", "status"],
        },
      ],
    },
    {
      name: "Date",
      selector: row => row.date,
      sortable: true,
    },
  ];

  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/c/55e1-d949-4b30-ad36")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err));
  }, [data]);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="lhs">
          <img src={assets.grid} alt="grid-image" />
          <ul>
            <li>Settings</li>
            <li>General Settings</li>
            <li>Users & Companies</li>
          </ul>
        </div>
        <div className="rhs">
          <div className="admin-profile">
            <div className="profile-pic">A</div>
            <div className="email">Administrator(@infoblablabla.com)</div>
          </div>
        </div>
      </div>

      <section className="settings-main">
        <div className="table-top">
          <div className="table-title-search">
            <p>Users</p>
            <div className="right-part flex-group">
              <div className="settings-search-box">
                <input type="text" />
                <img src={assets.searchIcon} alt="" />
              </div>
              <div className="flex-group filter-sort">
                <div className="filter flex-group pop-up">
                  <img src={assets.edit} alt="filter Icon" />
                  <p>Filter</p>
                </div>
                <div className="sort-by flex-group pop-up">
                  <img src={assets.edit} alt="sort-by Icon" />
                  <p>Sort By</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table columns={columns} data={data} error={error} />
      </section>
    </div>
  );
};

export default SettingsPage;
