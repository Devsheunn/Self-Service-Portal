import React from "react";
// import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ tittle, description, image, url }) => {
  const navigate = useNavigate();

  const handleClick = url => {
    navigate(url);
  };

  return (
    <div className="card" onClick={() => handleClick(url)}>
      <img src={image} alt="" />
      <h2>{tittle}</h2>
      <p>{description}</p>
      <img
        className="arrow
      "
        src={assets.arrow}
        alt="arrow Icon"
      />
    </div>
  );
};

export default Card;
