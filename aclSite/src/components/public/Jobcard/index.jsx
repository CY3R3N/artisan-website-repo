import React from "react";
import { LuClock } from "react-icons/lu";
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../Jobcard/Jobcard.css";

function Jobcard({ job }) {
  const title = job?.title || "Creative Graphics Designer";
  const type = job?.job_type || "Full Time";
  const location = job?.location || "Head Office";
  const salary = job?.salary_range || "Negotiation";
  const deadline = job?.deadline || "28 Feb, 2025";

  return (
    <div className="job-card mb-3">
      <div className="c-head d-flex">
        <div className="d-flex align-items-center job-title">
          <IoBriefcaseOutline className="me-3" /> {title}
        </div>
        <Link
          className="float-end ms-auto apply-btn"
          to={`mailto:career@artisanceramics.com?subject=Job%20Application%20-%20${encodeURIComponent(
            title
          )}`}
        >
          Apply Now
        </Link>
      </div>

      <div className="c-body mt-3">
        <div className="d-flex">
          <div className="cj-item me-4">
            <LuClock className="me-1" /> {type}
          </div>
          <div className="cj-item me-4 d-lg-block d-none">
            <IoLocationOutline className="me-1" /> {location}
          </div>
          <div className="cj-item d-lg-block d-none">
            <TbCoinTaka className="me-1" /> {salary}
          </div>
        </div>
        <div className="ms-auto cj-item">
          <FaRegCalendarCheck className="me-1" /> Deadline: {deadline}
        </div>
      </div>
    </div>
  );
}

export default Jobcard;
