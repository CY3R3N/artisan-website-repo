import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import OurStoryImg from "../../../assets/images/acl-factory-2.png";
import "../About/About.css";

function About() {
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".acl-fact-img", {
      y: 200,
      opacity: 0,
    });

    tl.from(".story", {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    });
  });

  return (
    <div className="about-us">
      <div className="container">
        <div className="row gx-lg-5">
          <div className="col-sm-12 col-md-12 col-lg-5">
            <div className="our-story-img-wraper">
              <img className="acl-fact-img" src={OurStoryImg} alt="our-story" />
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-7">
            <div className="component-title">
              {"Who We Are".split(" ").map((word, index) => (
                <div className="word" key={index}>
                  {word}
                </div>
              ))}
            </div>

            <p className="text-justify lead-text story">
              Artisan Ceramics Limited is a subsidiary of Consolidated Tea and
              Lands Company (Bangladesh) Limited & Baraoora (Sylhet) Tea Company
              Limited (former subsidiaries of James Finlay Ltd., UK). Artisan
              Ceramics Limited was established in 2005 to produce top of the
              range porcelain tableware of all kinds for the international
              market.
            </p>
            <p className="text-justify story">
              With a presence in over 50 countries worldwide, our reputation for
              quality craftsmanship and exceptional customer service speaks for
              itself. We are proud to have won the national export trophy for
              the third time, an achievement that reflects our commitment to
              excellence in every aspect of our business. We work tirelessly to
              ensure that our products meet the highest standards of excellence,
              using only the finest materials and time-tested traditional
              techniques. We understand the importance of providing our
              customers with the best possible experience. From our skilled
              artisans to our friendly customer service team, we are committed
              to ensuring that every interaction with our company is a positive
              one.
            </p>
            <p className="text-justify story">
              For our domestic market, we take pride in providing customized
              solutions that meet the specific needs and requirements of our
              clients. Our team of skilled artisans and customer service
              professionals work closely with our clients to ensure that every
              aspect of the production process is tailored to their needs,
              resulting in truly bespoke pieces that are both functional and
              beautiful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
