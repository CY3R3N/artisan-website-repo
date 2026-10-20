import React from "react";
// import { Microwave } from "../../../data/icons";
import "../Qcard/Qcard.css";

function Qcard({ icon: Icon, title, text }) {
  // console.log(qlty);
  return (
    <div className="qcard">
      <div className="qcard-body">
        <div className="qcard-icon">
          <Icon />
        </div>
        <h4 className="qcard-title">{title}</h4>
        <p className="qcard-text">{text}</p>
      </div>
    </div>
  );
}

export default Qcard;
