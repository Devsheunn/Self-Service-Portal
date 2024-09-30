import DataTable from "react-data-table-component";
import "./Table.css";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import { FormContext } from "../../Context/FormContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const customStyles = {
  rows: {
    style: {
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#f3f4f6",
      },
    },
  },
  headCells: {
    style: {
      backgroundColor: "#f0f0f0",
      fontWeight: "700",
    },
  },
};

const Table = ({ columns, data, error }) => {
  const { isPending } = useContext(FormContext);
  const navigate = useNavigate();

  const paginationComponentOptions = {
    rowsPerPageText: "",
    // rangeSeparatorText: "de",
    // selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-container">
      {error ? (
        <div>NO DATA</div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          progressPending={isPending}
          customStyles={customStyles}
          progressComponent={<ClipLoader size={20} />}
          onRowClicked={(row, event) => {
            console.log(row.id);
            navigate(`/inconvenience-allowance/${row.id}`);
          }}
        />
      )}
    </div>
  );
};

export default Table;
