import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";

import "../Catcard/Catcard.css";

function Catcard({ shape, desc, img }) {
  return (
    <div className="cat-card">
      <div className="cat-img-wraper">
        <div className="c-img-wrap">
          <Link to={`/product-details/${shape}`}>
            <img src={img} alt={shape} />
          </Link>
        </div>
        <div className="text-wrap">
          <p>{desc}</p>
        </div>
      </div>
      <div className="cat-card-footer">
        <h4>{shape}</h4>
        <Link className="details-btn" to={`/product-details/${shape}`}>
          <MdOutlineArrowOutward />
        </Link>
      </div>
    </div>
  );
}

export default Catcard;
