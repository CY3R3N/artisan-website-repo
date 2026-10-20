import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Pagetitle from "../../components/public/Pagetitle";
import Managingcard from "../../components/public/Managingcard";

import PlImg from "../../assets/images/placeholder.png";
import Img from "../../assets/images/ceo.jpg";

function ManagingCommittee() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const mcCard = document.querySelectorAll(".mc-card");
    mcCard.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          scroller: "body",
        },
        y: 150,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      });
    });
  });

  return (
    <section>
      <Pagetitle title="Managing Committee" />

      <div className="managing-committee py-100">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="brd-title">
                Meet Our<br></br>Honorable Executive Committee
              </h1>
              <p className="brd-title-text">
                Meet our distinguished Executive Committee, a team of
                experienced leaders committed to driving our company’s strategy
                and growth. Their expertise and collaborative approach ensure we
                remain focused on excellence and long-term success.
              </p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-sm-12 d-flex justify-content-center">
              <Managingcard
                img={Img}
                name="Mr. M. Mamunur Rashid"
                designation="Chief Executive Officer(CEO)"
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-md-6 d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Abdur Rouf Mollah"
                designation="AGM"
              />
            </div>
            <div className="col-sm-12 col-md-6 dpl-lg-flex d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Abu Jafar Sharker"
                designation="AGM"
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-md-4 d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Kamal Hossain"
                designation="AGM"
              />
            </div>
            <div className="col-sm-12 col-md-4 d-lg-center d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Zahid Goni Chowdhury"
                designation="AGM"
              />
            </div>
            <div className="col-sm-12 col-md-4 dpl-lg-flex d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Tafazzal Hossain Bhuyan"
                designation="Senior Manager"
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-md-3 d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Robiul Islam"
                designation="Manager"
              />
            </div>
            <div className="col-sm-12 col-md-3 d-lg-center d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Md. Mohiuddin"
                designation="Manager"
              />
            </div>
            <div className="col-sm-12 col-md-3 d-lg-center d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Sajjat Hossain"
                designation="Manager"
              />
            </div>
            <div className="col-sm-12 col-md-3 dpl-lg-flex d-center">
              <Managingcard
                img={PlImg}
                name="Mr. Azizur Rahman"
                designation="Manager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManagingCommittee;
