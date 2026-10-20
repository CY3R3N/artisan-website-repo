import React from "react";
import "../Team/Team.css";

function Team({ teamImg, tmName, tmPosition }) {
  return (
    <div className="tm-card">
      <div className="tm-img">
        <img src={teamImg} alt={tmName} />
      </div>
      <div className="tm-card-body text-center">
        <h4 className="tm-title mb-1">{tmName}</h4>
        <h5 className="tm-text mb-3">{tmPosition}</h5>
      </div>
    </div>
  );
}

export default Team;
