import { assets } from "../../assets/assets";
import AuthContext from "../../Context/AuthContext";
import "./Loader.css";
import { useContext, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  const { isLoading } = useContext(AuthContext);
  const [color] = useState("#f12c26");

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <PuffLoader
            speedMultiplier={1}
            color={color}
            loading={isLoading}
            size={100}
          />
        </div>
      ) : null}
    </>
  );
};

export default Loader;
