import React from "react";

function Careercard({ icon: Icon, title, text }) {
  return (
    <div className="career-card">
      <div className="c-icon">
        <Icon />
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default Careercard;
