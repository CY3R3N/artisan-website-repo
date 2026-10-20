import React from "react";

import "../Managingcard/Managingcard.css";

function Managingcard({ img, name, designation }) {
  return (
    <div className="mc-card">
      <img src={img} alt={name} />
      <h5>{name}</h5>
      <h6>{designation}</h6>
    </div>
  );
}

export default Managingcard;
