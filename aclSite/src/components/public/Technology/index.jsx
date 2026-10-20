import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import TeImg1 from "../../../assets/images/te-1.jpg";
import TeImg2 from "../../../assets/images/te-2.jpg";
import TeImg3 from "../../../assets/images/te-3.jpg";

import "../Technology/Technology.css";

function Technology() {
  useGSAP(() => {
    // Register ScrollTrigger with gsap
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".technology-expt",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 1,
      },
    });

    tl.from(".t-word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".te-desc", {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".anm", {
      y: 200,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    });
  });

  return (
    <div className="technology-expt">
      <div className="container">
        <div className="row gx-lg-5">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="tech-component-title">
              {"Our Experties".split(" ").map((word, index) => (
                <div className="t-word" key={index}>
                  {word}
                </div>
              ))}
            </div>

            <p className="te-desc text-justify">
              Our factory in Bhabanipur, Gazipur, Bangladesh, is equipped with
              advanced European technology, enabling precise production and
              exceptional quality. With a team of 850 skilled professionals, we
              are proud to uphold inclusivity and innovation in the workplace.
            </p>

            <div className="te-desc">
              <h5>IMPRESSIVE PRODUCTION CAPACITY</h5>
              <p className="text-justify">
                Producing 15 million pieces of porcelain tableware monthly, our
                facility ensures consistency, efficiency, and excellence to meet
                the demands of global markets.
              </p>
            </div>

            <div className="te-desc">
              <h5>COMMITMENT TO SUSTAINABILITY</h5>
              <p className="text-justify">
                We prioritize eco-conscious practices, maintaining a facility
                that complies with strict environmental standards, setting a
                benchmark for sustainable production in the industry.
              </p>
            </div>

            <div className="te-desc">
              <h5>ELEGANT DESIGNS & CHOICES</h5>
              <p className="text-justify">
                From classic styles to modern finishes, including rustic,
                reactive, and dual-tone options, our diverse range of designs
                caters to both traditional and contemporary tastes.
              </p>
            </div>

            <div className="te-desc">
              <h5>PRECISION & CRAFTSMANSHIP</h5>
              <p className="text-justify">
                Our skilled artisans use advanced techniques and equipment, such
                as resin molding and high-pressure casting, to create tableware
                that combines superior functionality with refined aesthetics.
              </p>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="te-img-wraper">
              <div className="img-wrap w-55">
                <img className="anm te-img-1" src={TeImg1} alt="te-img" />
                <div className="anm te-text-container">100% Pure Porcelain</div>
              </div>
              <div className="img-wrap w-45">
                <img className="anm te-img-2" src={TeImg2} alt="te-img" />
                <img className="anm te-img-3" src={TeImg3} alt="te-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Technology;
