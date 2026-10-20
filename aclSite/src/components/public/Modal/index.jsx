import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../Modal/ReactModal.css";
import CountdownTimer from "../CountdownTimer";
import { api } from "../../../services/api";

function ReactModal(props) {
  const [popupData, setPopupData] = useState({
    title: "ambiente",
    subtitle: "6.-10.2.2026",
    content: "frankfurt/main",
    hall: "Halle Standnr./Hall",
    stand: "--",
    targetDate: "2026-02-06T23:59:59",
    isActive: true,
  });

  useEffect(() => {
    let isMounted = true;
    api
      .getSection("upcoming_popup")
      .then((res) => {
        if (!isMounted || !res) return;
        setPopupData({
          title: res.title || "ambiente",
          subtitle: res.subtitle || "6.-10.2.2026",
          content: res.content || "frankfurt/main",
          hall: res.data?.hall || "Halle Standnr./Hall",
          stand: res.data?.stand?.replace("Stand No. ", "") || "--",
          targetDate: res.data?.target_date || "2026-02-06T23:59:59",
          isActive: res.data?.is_active ?? true,
        });
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  if (!popupData.isActive) {
    return null;
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="counter-wraper">
          <div className="fair-time">
            <div className="fair-logo">
              <h1>{popupData.title}</h1>
              <h4>{popupData.subtitle}</h4>
              <h4>{popupData.content}</h4>
            </div>
            <div className="stand">
              <h4>{popupData.hall}</h4>
              <h4>
                Stand No. <span>{popupData.stand}</span>
              </h4>
            </div>
          </div>
          <CountdownTimer targetDate={popupData.targetDate} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ReactModal;
