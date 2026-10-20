import React from "react";
import { useOutletContext } from "react-router-dom";
import { FiMail, FiSend } from "react-icons/fi";
import placeholderImg from "../../../assets/images/placeholder.png";
import "../Catalogcard/Catalogcard.css";

function Catalogcard({ catImg, catName, catDate, onRequest }) {
  const { setCursorHover, Catalog } = useOutletContext() || {};
  const animation = Catalog || {}; // Ensure animation is defined

  // Ensure setCursorHover is a function before calling it
  const handleMouseEnter = () => {
    if (typeof setCursorHover === "function") setCursorHover("catalog");
  };

  const handleMouseLeave = () => {
    if (typeof setCursorHover === "function") setCursorHover(null);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onRequest === "function") {
      onRequest({ catImg, catName, catDate });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      className={`catalog-card ${animation?.type || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Request ${catName || "catalog"}`}
    >
      <div className="catalog-card-action">
        <div className="catalog-img-wrapper">
          <img
            className="catalog-img"
            src={catImg || placeholderImg}
            alt={catName || "Catalog thumbnail"}
            onError={(e) => {
              e.currentTarget.src = placeholderImg;
            }}
          />
          <div className="catalog-request-overlay">
            <FiMail /> Request Catalog
          </div>
        </div>

        <h4 className="mb-1 d-flex justify-content-between align-items-center">
          <span>{catName || "Untitled Catalog"}</span>
          <span className="action-icon" title="Request this catalog">
            <FiSend className="fs-5" />
          </span>
        </h4>
        <h5>{catDate || "Unknown Date"}</h5>
      </div>
    </div>
  );
}

export default Catalogcard;
