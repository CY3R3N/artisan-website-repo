import React from "react";
import PageTitleImg from "../../../assets/images/header-bg.png";
import "../Pagetitle/Pagetitle.css";

function Pagetitle({ title }) {
  return (
    <div className="page-title">
      <div
        className="page-title-img-wraper"
        style={{ backgroundImage: `url(${PageTitleImg})` }}
      >
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-sm-12">
              <div className="d-flex align-items-end h-100">
                <h1 className="mt-auto">{title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagetitle;
