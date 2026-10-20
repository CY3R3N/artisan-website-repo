import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "../Accordioncomp/Accordioncomp.css";

function Accordioncomp({ question, answer, eventKey }) {
  return (
    <Accordion className="anm-item">
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>{question}</Accordion.Header>
        <Accordion.Body>{answer}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Accordioncomp;
