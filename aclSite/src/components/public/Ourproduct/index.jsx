import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import "../Ourproduct/Ourproduct.css";
import img1 from "../../../assets/images/img-1.png";
import img2 from "../../../assets/images/img-2.png";
import img3 from "../../../assets/images/img-3.png";
import img4 from "../../../assets/images/img-4.png";
import img5 from "../../../assets/images/img-5.png";
import img6 from "../../../assets/images/img-6.png";
import img7 from "../../../assets/images/img-7.png";
import img7l from "../../../assets/images/img-7-l.png";

function Ourproduct() {
  useGSAP(() => {
    // Register ScrollTrigger with gsap
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".our-product",
        scroller: "body",
        // markers: true,
        start: "top 60%",
        // scrub: 1,
      },
    });

    tl.from(".word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });
  });

  useGSAP(() => {
    // Register ScrollTrigger with gsap
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".img-wraper",
        scroller: "body",
        // markers: true,
        start: "top 60%",
        // scrub: 1,
      },
    });

    tl.from(
      ".img-2",
      {
        x: "96%",
        y: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      0
    );

    tl.from(
      ".img-6",
      {
        x: "-50%",
        y: "-100%",
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: "power3.out",
      },
      0
    );

    tl.from(
      ".img-7",
      {
        x: "0%",
        y: "-100%",
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: "power3.out",
      },
      0
    );

    tl.from(
      ".img-7l",
      {
        x: "0%",
        y: "-100%",
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: "power3.out",
      },
      0
    );

    tl.from(
      ".img-3",
      {
        x: "95%",
        y: "100%",
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: "power3.out",
      },
      0
    );

    tl.from(
      ".img-4",
      {
        x: "0%",
        y: "100%",
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: "power3.out",
      },
      0
    );

    tl.from(
      ".img-5",
      {
        x: "-100%",
        y: "100%",
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: "power3.out",
      },
      0
    );

    tl.from(
      ".img-1",
      {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: "power3.out",
      },
      0
    );
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".desc", {
      scrollTrigger: {
        trigger: ".desc",
        scroller: "body",
        // markers: true,
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "easeInOutQuart",
    });

    gsap.from(".pr-item", {
      scrollTrigger: {
        trigger: ".pr-item",
        start: "top 90%",
        end: "bottom top",
        // markers: true,
      },
      y: 200,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
  });

  return (
    <section className="our-product">
      <div className="container-lg container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-6 order-lg-1 order-2">
            <div className="img-wraper">
              <img className="img-1" src={img1} alt="img-1" />
              <img className="img-2" src={img2} alt="img-2" />
              <img className="img-3" src={img3} alt="img-3" />
              <img className="img-4" src={img4} alt="img-4" />
              <img className="img-5" src={img5} alt="img-5" />
              <img className="img-6" src={img6} alt="img-6" />
              <img className="img-7" src={img7} alt="img-7" />
              <img className="img-7l" src={img7l} alt="img-7" />
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 order-lg-2 order-1">
            <div className="component-title mx-lg-0 mx-auto">
              {"Our Products".split(" ").map((word, index) => (
                <div className="word" key={index}>
                  {word}
                </div>
              ))}
            </div>
            <p className="desc text-center text-lg-start">
              Discover our exquisite collection of handcrafted ceramics
              tableware, designed to elevate your dining experience. From
              elegant dinner sets to unique serving pieces, our products combine
              artistry with functionality, making every meal a special occasion.
            </p>
            <div className="product-details mt-5">
              <div className="pr-item">
                <span className="icon">
                  <svg
                    width="100%"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    style={{ enableBackground: "new 0 0 120 42" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M0,23.5c0.1-0.8,0.2-1.7,0.4-2.5C1.9,12.5,8.7,5.5,17.2,3.8c11.8-2.4,22.9,4.7,25.6,16.5c0.3,1.4,0.4,2.9,0.5,4.4
                            c0,0.1,0,0.2,0,0.3c1.3,0,1.6,1.6,1.7,2.6c0.3,0,0.5,0,0.8,0c2,0,3.6,1.3,4.1,3.3c0,0.1,0.1,0.1,0.1,0.2c0,1.5,0,3.1,0,4.6
                            c0,0.1-0.1,0.2-0.1,0.3c-0.5,2.1-1.8,3.5-3.9,4c-0.7,0.2-1.6,0.1-2.3,0.1c-0.1,0-0.3,0-0.4,0.1c-0.5,0.5-1,1-1.5,1.6
                            c2.1,0,4.1,0,6.2,0c1,0,1.7,0.3,2.1,1.3c0,0.6,0,1.1,0,1.7c-0.3,1.1-1,1.7-2.1,2c-10.3,0-20.6,0-31,0c-1,0-1.8-0.5-1.9-1
                            C7.3,42.8,2.4,37.4,0.5,29.5c-0.2-1-0.3-2-0.5-3C0,25.5,0,24.5,0,23.5z M35,25c0.1-6.7-5.3-13.2-13.1-13.3
                            c-7.4-0.1-13.7,6.1-13.5,13.4C8.5,33,14.9,38,20.6,38.2c-0.5-0.9-0.6-2.4-0.6-3.6c0-2.3,0-4.6,0-6.9c0-1.8,1-2.8,2.8-2.8
                            c3.9,0,7.7,0,11.6,0C34.5,25,34.7,25,35,25z M23.2,41.6c0,0-1-0.7-1.9-1.7c-0.7-0.1-1.4-0.1-2.1-0.2c-8.4-1.5-13.8-9.2-12.3-17.5
                            c1.3-7.6,8.5-13,16.2-12.2c7,0.7,12.5,6.1,13.4,13.1c0.1,0.6,0.1,1.2,0.2,1.8c1.7,0,3.3,0,4.9,0c0.1-9.9-7.5-18.9-18.2-19.8
                            c-11.1-1-20.6,7-21.7,17.8C0.7,33.5,7.9,41.5,15,43.7c0,0,0-0.1,0-0.1c0.1-1.5,0.6-1.9,2.1-1.9C19.1,41.6,21.2,41.6,23.2,41.6z
                            M21.7,30c0,1.7,0,3.4,0,5c0,3.6,2.9,6.5,6.5,6.6c2.9,0,5.7,0,8.6,0c3.4,0,6.2-2.6,6.5-5.9c0.1-1.6,0.1-3.2,0.1-4.9
                            c0-0.3,0-0.5,0-0.8C36.1,30,28.9,30,21.7,30z M16.7,43.3c-0.2,1.2,0,1.7,1.4,1.7c9.6,0,19.3,0,28.9,0c0.2,0,0.4,0,0.5,0
                            c0.4-0.1,0.7-0.3,0.7-0.7c0-0.3,0-0.6,0-1C37.8,43.3,27.3,43.3,16.7,43.3z M43.3,28.3c0.2-1.1,0-1.7-1.4-1.7c-3.3,0-6.6,0-9.9,0
                            c-3.1,0-6.2,0-9.3,0c-0.5,0-0.9,0.1-1,0.6c-0.1,0.3,0,0.7,0,1C28.9,28.3,36.1,28.3,43.3,28.3z M44.3,38.3c2.2,0.2,3.9-1.1,4-3.1
                            c0.1-1.2,0-2.4,0-3.6c-0.1-1.6-1.7-2.7-3.3-2.3c0,0.9,0,1.8,0,2.8C45,34.1,45.2,36.2,44.3,38.3z"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
                <div className="item-desc">
                  <h5>100% Pure Porcelain</h5>
                  <p>
                    Crafted with the finest raw materials, our 100% Pure
                    Porcelain offers exceptional whiteness, strength, and
                    elegance, making it perfect for premium tableware and
                    hospitality use.
                  </p>
                </div>
              </div>
              <div className="pr-item">
                <span className="icon">
                  <svg
                    width="100%"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    style={{ enableBackground: "new 0 0 120 42" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M0,23.5c0.1-0.8,0.2-1.7,0.4-2.5C1.9,12.5,8.7,5.5,17.2,3.8c11.8-2.4,22.9,4.7,25.6,16.5c0.3,1.4,0.4,2.9,0.5,4.4
                            c0,0.1,0,0.2,0,0.3c1.3,0,1.6,1.6,1.7,2.6c0.3,0,0.5,0,0.8,0c2,0,3.6,1.3,4.1,3.3c0,0.1,0.1,0.1,0.1,0.2c0,1.5,0,3.1,0,4.6
                            c0,0.1-0.1,0.2-0.1,0.3c-0.5,2.1-1.8,3.5-3.9,4c-0.7,0.2-1.6,0.1-2.3,0.1c-0.1,0-0.3,0-0.4,0.1c-0.5,0.5-1,1-1.5,1.6
                            c2.1,0,4.1,0,6.2,0c1,0,1.7,0.3,2.1,1.3c0,0.6,0,1.1,0,1.7c-0.3,1.1-1,1.7-2.1,2c-10.3,0-20.6,0-31,0c-1,0-1.8-0.5-1.9-1
                            C7.3,42.8,2.4,37.4,0.5,29.5c-0.2-1-0.3-2-0.5-3C0,25.5,0,24.5,0,23.5z M35,25c0.1-6.7-5.3-13.2-13.1-13.3
                            c-7.4-0.1-13.7,6.1-13.5,13.4C8.5,33,14.9,38,20.6,38.2c-0.5-0.9-0.6-2.4-0.6-3.6c0-2.3,0-4.6,0-6.9c0-1.8,1-2.8,2.8-2.8
                            c3.9,0,7.7,0,11.6,0C34.5,25,34.7,25,35,25z M23.2,41.6c0,0-1-0.7-1.9-1.7c-0.7-0.1-1.4-0.1-2.1-0.2c-8.4-1.5-13.8-9.2-12.3-17.5
                            c1.3-7.6,8.5-13,16.2-12.2c7,0.7,12.5,6.1,13.4,13.1c0.1,0.6,0.1,1.2,0.2,1.8c1.7,0,3.3,0,4.9,0c0.1-9.9-7.5-18.9-18.2-19.8
                            c-11.1-1-20.6,7-21.7,17.8C0.7,33.5,7.9,41.5,15,43.7c0,0,0-0.1,0-0.1c0.1-1.5,0.6-1.9,2.1-1.9C19.1,41.6,21.2,41.6,23.2,41.6z
                            M21.7,30c0,1.7,0,3.4,0,5c0,3.6,2.9,6.5,6.5,6.6c2.9,0,5.7,0,8.6,0c3.4,0,6.2-2.6,6.5-5.9c0.1-1.6,0.1-3.2,0.1-4.9
                            c0-0.3,0-0.5,0-0.8C36.1,30,28.9,30,21.7,30z M16.7,43.3c-0.2,1.2,0,1.7,1.4,1.7c9.6,0,19.3,0,28.9,0c0.2,0,0.4,0,0.5,0
                            c0.4-0.1,0.7-0.3,0.7-0.7c0-0.3,0-0.6,0-1C37.8,43.3,27.3,43.3,16.7,43.3z M43.3,28.3c0.2-1.1,0-1.7-1.4-1.7c-3.3,0-6.6,0-9.9,0
                            c-3.1,0-6.2,0-9.3,0c-0.5,0-0.9,0.1-1,0.6c-0.1,0.3,0,0.7,0,1C28.9,28.3,36.1,28.3,43.3,28.3z M44.3,38.3c2.2,0.2,3.9-1.1,4-3.1
                            c0.1-1.2,0-2.4,0-3.6c-0.1-1.6-1.7-2.7-3.3-2.3c0,0.9,0,1.8,0,2.8C45,34.1,45.2,36.2,44.3,38.3z"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
                <div className="item-desc">
                  <h5>High Alumina Porcelain</h5>
                  <p>
                    Our High Alumina Porcelain ensures superior durability, heat
                    resistance, and strength, ideal for both industrial and
                    high-end tableware applications.
                  </p>
                </div>
              </div>
              <div className="pr-item">
                <span className="icon">
                  <svg
                    width="100%"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    style={{ enableBackground: "new 0 0 120 42" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M0,23.5c0.1-0.8,0.2-1.7,0.4-2.5C1.9,12.5,8.7,5.5,17.2,3.8c11.8-2.4,22.9,4.7,25.6,16.5c0.3,1.4,0.4,2.9,0.5,4.4
                            c0,0.1,0,0.2,0,0.3c1.3,0,1.6,1.6,1.7,2.6c0.3,0,0.5,0,0.8,0c2,0,3.6,1.3,4.1,3.3c0,0.1,0.1,0.1,0.1,0.2c0,1.5,0,3.1,0,4.6
                            c0,0.1-0.1,0.2-0.1,0.3c-0.5,2.1-1.8,3.5-3.9,4c-0.7,0.2-1.6,0.1-2.3,0.1c-0.1,0-0.3,0-0.4,0.1c-0.5,0.5-1,1-1.5,1.6
                            c2.1,0,4.1,0,6.2,0c1,0,1.7,0.3,2.1,1.3c0,0.6,0,1.1,0,1.7c-0.3,1.1-1,1.7-2.1,2c-10.3,0-20.6,0-31,0c-1,0-1.8-0.5-1.9-1
                            C7.3,42.8,2.4,37.4,0.5,29.5c-0.2-1-0.3-2-0.5-3C0,25.5,0,24.5,0,23.5z M35,25c0.1-6.7-5.3-13.2-13.1-13.3
                            c-7.4-0.1-13.7,6.1-13.5,13.4C8.5,33,14.9,38,20.6,38.2c-0.5-0.9-0.6-2.4-0.6-3.6c0-2.3,0-4.6,0-6.9c0-1.8,1-2.8,2.8-2.8
                            c3.9,0,7.7,0,11.6,0C34.5,25,34.7,25,35,25z M23.2,41.6c0,0-1-0.7-1.9-1.7c-0.7-0.1-1.4-0.1-2.1-0.2c-8.4-1.5-13.8-9.2-12.3-17.5
                            c1.3-7.6,8.5-13,16.2-12.2c7,0.7,12.5,6.1,13.4,13.1c0.1,0.6,0.1,1.2,0.2,1.8c1.7,0,3.3,0,4.9,0c0.1-9.9-7.5-18.9-18.2-19.8
                            c-11.1-1-20.6,7-21.7,17.8C0.7,33.5,7.9,41.5,15,43.7c0,0,0-0.1,0-0.1c0.1-1.5,0.6-1.9,2.1-1.9C19.1,41.6,21.2,41.6,23.2,41.6z
                            M21.7,30c0,1.7,0,3.4,0,5c0,3.6,2.9,6.5,6.5,6.6c2.9,0,5.7,0,8.6,0c3.4,0,6.2-2.6,6.5-5.9c0.1-1.6,0.1-3.2,0.1-4.9
                            c0-0.3,0-0.5,0-0.8C36.1,30,28.9,30,21.7,30z M16.7,43.3c-0.2,1.2,0,1.7,1.4,1.7c9.6,0,19.3,0,28.9,0c0.2,0,0.4,0,0.5,0
                            c0.4-0.1,0.7-0.3,0.7-0.7c0-0.3,0-0.6,0-1C37.8,43.3,27.3,43.3,16.7,43.3z M43.3,28.3c0.2-1.1,0-1.7-1.4-1.7c-3.3,0-6.6,0-9.9,0
                            c-3.1,0-6.2,0-9.3,0c-0.5,0-0.9,0.1-1,0.6c-0.1,0.3,0,0.7,0,1C28.9,28.3,36.1,28.3,43.3,28.3z M44.3,38.3c2.2,0.2,3.9-1.1,4-3.1
                            c0.1-1.2,0-2.4,0-3.6c-0.1-1.6-1.7-2.7-3.3-2.3c0,0.9,0,1.8,0,2.8C45,34.1,45.2,36.2,44.3,38.3z"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
                <div className="item-desc">
                  <h5>Ultrabone Porcelain</h5>
                  <p>
                    A perfect fusion of elegance and resilience, Ultrabone
                    Porcelain delivers enhanced translucency, durability, and a
                    luxurious finish, redefining fine dining and hospitality
                    standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ourproduct;
