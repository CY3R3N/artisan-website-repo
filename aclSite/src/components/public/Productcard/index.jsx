import React from "react";
import {
  MeasurementIcon,
  DiaIcon,
  WeightIcon,
  CapacityIcon,
} from "../../../data/icons";
import "../Productcard/Productcard.css";

function Productcard({ pData }) {
  return (
    <div className="product-card">
      <img
        className="product-img"
        src={Array.isArray(pData.imgpath) ? pData.imgpath[0] : pData.imgpath}
        alt={pData.pname}
      />
      <div className="p-card-body pt-4">
        <h4 className="p-title">{pData.pname}</h4>

        <div className="d-flex my-4">
          <div className="d-flex align-items-center w-50">
            <MeasurementIcon />
            <p className="ms-2 mb-0">{pData.size}</p>
          </div>

          <div className="d-flex align-items-center w-50">
            <DiaIcon />
            <p className="ms-2 mb-0">{pData.dia}</p>
          </div>
        </div>

        <div className="d-flex my-4">
          <div className="d-flex align-items-center w-50">
            <CapacityIcon />
            <p className="ms-2 mb-0">{pData.capacity}</p>
          </div>

          <div className="d-flex align-items-center w-50">
            <WeightIcon />
            <p className="ms-2 mb-0">{pData.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
