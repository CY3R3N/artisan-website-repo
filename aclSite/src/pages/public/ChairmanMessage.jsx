import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Chairman from "../../assets/images/t-2.jpg";
// import t2 from "../../assets/images/t-2.jpg";
import Count from "../../components/public/Count";
import Pagetitle from "../../components/public/Pagetitle";

function ChairmanMessage() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".chairman-message",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 1,
      },
    });

    tl.from(".cm-word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".ch-message", {
      y: 150,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    });
  });

  return (
    <section>
      <Pagetitle title="Chairman Message" />

      <div className="chairman-message pt-100">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 com-md-12 col-lg-6">
              <img
                className="img-fluid"
                src={Chairman}
                alt="Mr. Showkat Ali Chowdhury"
              />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6 my-auto">
              <p className="mb-3 text-color-drk">A Word From Our Chairman</p>
              <div className="component-title">
                {"Mr. Showkat Ali Chowdhury".split(" ").map((word, index) => (
                  <div className="cm-word" key={index}>
                    {word}
                  </div>
                ))}
              </div>
              <p className="ch-message text-justify text-color-drk fn-18">
                It is my immense pleasure and privilege to have Artisan Ceramics
                Limited's updated website form 2015 on board. I strongly believe
                that this will add additional flair to decade old glorious
                journey of Artisan Ceramics Limited. I hope this website truly
                reflects the vision of Artisan Ceramics Limited “To become the
                tableware manufacturing company that best understands, produces
                and satisfies the need of customer across the globe through
                continual improvement and innovation.
              </p>
              <p className="ch-message text-justify text-color-drk fn-18">
                I thank all employees of Artisan Ceramics Limited for this
                wonderful endeavor. I also hope to see Artisan Ceramics Limited
                is growing, strong to stronger and big to bigger in
                the coming days.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-100">
        <Count />
      </div>
    </section>
  );
}

export default ChairmanMessage;
