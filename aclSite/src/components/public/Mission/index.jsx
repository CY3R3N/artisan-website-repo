import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import FactImg from "../../../assets/images/factory-2.png";
import "../Mission/Mission.css";

function Mission() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".mission",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 1,
      },
    });

    tl.from(".mission-img", {
      y: 200,
      opacity: 0,
      // stagger: 0.3,
    });

    tl.from(".m-card", {
      y: 200,
      opacity: 0,
      stagger: 0.3,
    });
  });

  return (
    <div className="mission">
      <div className="container">
        <div className="row gy-lg-0 gy-5">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <img className="mission-img" src={FactImg} alt="factory-img" />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 my-lg-auto">
            <div className="row gy-5">
              <div className="col-sm-12">
                <div className="m-card">
                  <h3>Mission</h3>
                  <p>
                    Our mission is to continually enhance every aspect of our
                    operations by paying meticulous attention to detail to
                    achieve perfection. We are committed to ensuring the safety
                    and comfort of our workforce, protecting the environment,
                    and delivering exceptional value to a discerning and
                    satisfied customer base.
                  </p>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="m-card">
                  <h3>Vision</h3>
                  <p>
                    Our vision is to be the leading tableware manufacturer
                    globally by understanding, producing, and exceeding customer
                    expectations through relentless innovation and continuous
                    improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
