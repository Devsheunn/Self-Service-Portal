import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./StatusBar.css";
import AuthContext from "../../Context/AuthContext";
import { FormContext } from "../../Context/FormContext";

const StatusBar = ({ isPreview }) => {
  const { status } = useContext(AuthContext);
  const { stages } = useContext(FormContext);
  const handleIcon = stage => {
    if (stage.type === "Form") {
      return assets.formIconGray;
    } else {
      const icon =
        stage.type === "Overview" ? assets.overview : assets.approval;
      return icon;
    }
  };
  return (
    <>
      <div className="stages">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={
              stages.indexOf(stage) <= stages.indexOf(status) && isPreview
                ? "stage approved"
                : "stage"
            }
          >
            <div className="progress-dot"></div>
            <div className="info">
              <p>{stage}</p>
              <div className="type">
                <img src={handleIcon(stage)} alt="" />
                <p>{stage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatusBar;
