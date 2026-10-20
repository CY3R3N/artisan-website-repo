import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import "../Newscard/Newscard.css";

function Newscard({ newsData }) {
  const { setCursorHover } = useOutletContext();

  return (
    <div
      className="card newscard"
      onMouseEnter={() => setCursorHover("news")}
      onMouseLeave={() => setCursorHover(null)}
    >
      <img src={newsData.img} className="card-img-top" alt="news-img" />
      <div className="card-body">
        <div className="d-flex align-items-center">
          <span>Event</span>
          <span className="post-date">{newsData.date}</span>
        </div>
        <h5 className="card-title mt-4">{newsData.title}</h5>
        <Link to="#" className="btn-more">
          Read more <BsArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default Newscard;
