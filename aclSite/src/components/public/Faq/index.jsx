import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Accordioncomp from "../Accordioncomp";
import "../Faq/Faq.css";

function Faq() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".faq",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 1,
      },
    });

    tl.from(".anm-item", {
      y: 200,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
      delay: 0.2,
    });
  });

  const quest = [
    {
      id: 1,
      question: "What types of tableware do you offer?",
      answer:
        "We offer a wide range of Pure Porcelain, Ultra Bone Porcelain, High Alumina Porcelain, ceramic tableware, including dinner plates, bowls, mugs, serving platters, tea sets, and more. Our products are designed for both everyday use and special occasions.",
    },
    {
      id: 2,
      question: "Are your ceramic products dishwasher safe?",
      answer:
        "Yes, most of our ceramics are dishwasher safe. However, we recommend handwashing delicate or hand-painted items to preserve their finish.",
    },
    {
      id: 3,
      question: "Can your tableware be used in the microwave?",
      answer:
        "Yes, our ceramics are microwave-safe, unless otherwise specified. Please avoid using items with metallic accents in the microwave.",
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer:
        "We accept returns for unused and undamaged items within 30 days of purchase. Custom or personalized items are non-returnable. Please see our return policy for details.",
    },
    {
      id: 5,
      question: "Are your products eco-friendly?",
      answer:
        "Yes, we are committed to sustainability. Our ceramics are made using natural materials, and our manufacturing process is designed to minimize waste and energy usage.",
    },
  ];

  const accordionMap = quest.map((acr, index) => {
    return (
      <Accordioncomp
        key={index}
        eventKey={index.toString()}
        question={acr.question}
        answer={acr.answer}
      />
    );
  });
  return (
    <div className="container faq">
      <div className="row gx-lg-5">
        <div className="col-sm-12 col-md-12 col-lg-5">
          <h5 className="anm-item">FAQ</h5>
          <h1 className="anm-item">Do you have any questions?</h1>
          <p className="anm-item">
            Got questions? Explore our FAQ section for quick answers, or reach
            out to us directly. We're always here to assist and provide the
            information you need!
          </p>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-7">{accordionMap}</div>
      </div>
    </div>
  );
}

export default Faq;
