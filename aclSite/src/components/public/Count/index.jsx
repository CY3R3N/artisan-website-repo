import React from "react";
import { Link } from "react-router-dom";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import "../Count/Count.css";

function Count() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".count",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 1,
      },
    });

    tl.from(".count", {
      y: 200,
      opacity: 0,
      stagger: 0.3,
    });
  });

  return (
    <section className="count">
      <div className="container">
        <div className="count-card">
          <div className="row">
            <div className="col-sm-12 p-0">
              <div className="count-header">
                <h3>From Our Hand to Your Table Elegance Redefined</h3>
                <Link to="/contact">Get Started Now</Link>
              </div>
            </div>

            <hr className="divider" />

            <div className="col-sm-12 col-md-4 p-lg-0">
              <div className="c-card">
                <div className="d-flex align-items-center">
                  <h1>50+</h1>
                  <div className="c-desc">Countries over the world</div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 p-lg-0">
              <div className="c-card">
                <div className="d-flex align-items-center">
                  <h1>5</h1>
                  <div className="c-desc">Won National Export Trophy</div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 p-lg-0">
              <div className="c-card">
                <div className="d-flex align-items-center">
                  <h1>1K+</h1>
                  <div className="c-desc">Satisfied corporate customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Count;
