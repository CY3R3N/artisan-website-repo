import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../Carousel/Carousel.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import SL1 from "../../../assets/images/products/sl-1.png";
import SL2 from "../../../assets/images/products/sl-2.png";
import SL3 from "../../../assets/images/products/sl-3.png";
import SL4 from "../../../assets/images/products/sl-4.png";
import SL5 from "../../../assets/images/products/sl-5.png";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const slidesData = [
  {
    id: 1,
    img: SL1,
    title: "Organic Design",
    description:
      "Celebrate nature with our Organic Design Tableware Set. Crafted with flowing shapes and earthy tones, it adds natural elegance to any dining occasion, offering a perfect balance of simplicity and sophisticated charm.",
  },
  {
    id: 2,
    img: SL2,
    title: "Golden Floral",
    description:
      "Introducing our Golden Floral Tableware Set, where elegance meets artistry. This beautifully crafted set features intricate floral patterns in luxurious gold, adding a touch of sophistication to any dining occasion. Perfect for both formal gatherings and intimate meals, it brings timeless beauty and charm to your table.",
  },
  {
    id: 3,
    img: SL3,
    title: "Colorful Design",
    description:
      "Add vibrancy to your table with our Colorful Glaze Design Tableware Set. Featuring rich, glossy glazes in stunning hues, this set brings a playful yet elegant touch to your dining experience.",
  },
  {
    id: 4,
    img: SL4,
    title: "Eligance Design",
    description:
      "Elevate your dining experience with our Elegance Design Tableware Set. With sleek lines and refined detailing, this set exudes timeless sophistication, making it the perfect choice for any formal or special occasion.",
  },
  {
    id: 5,
    img: SL5,
    title: "Royal Design",
    description:
      "Experience luxury with our Royal Design Tableware Set. Adorned with regal patterns and opulent finishes, this set brings a touch of grandeur and sophistication to your dining table, perfect for celebrating special occasions.",
  },
  {
    id: 6,
    img: SL4,
    title: "Elegance Design",
    description:
      "Elevate your dining experience with our Elegance Design Tableware Set. With sleek lines and refined detailing, this set exudes timeless sophistication, making it the perfect choice for any formal or special occasion.",
  },
  {
    id: 7,
    img: SL3,
    title: "Colorful Design",
    description:
      "Add vibrancy to your table with our Colorful Glaze Design Tableware Set. Featuring rich, glossy glazes in stunning hues, this set brings a playful yet elegant touch to your dining experience.",
  },
];

function Slider() {
  const sliderRef = useRef(null);

  // title animation
  useGSAP(() => {
    // let tl = gsap.timeline();

    gsap.from(".slider", {
      y: 200,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      ease: "easeInOutQuart",
      scrollTrigger: {
        trigger: ".slider",
        scroller: "body",
        // markers: true,
        start: "top 80%",
      },
    });
    gsap.from(".slider-wraper h1", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "easeInOutQuart",
      scrollTrigger: {
        trigger: ".slider-wraper h1",
        scroller: "body",
        // markers: true,
        start: "top 70%",
      },
    });
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      // Move the first slide to the end of the list
      const firstSlide = sliderRef.current.firstChild;
      sliderRef.current.appendChild(firstSlide);
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      // Move the last slide to the beginning of the list
      const lastSlide = sliderRef.current.lastChild;
      sliderRef.current.prepend(lastSlide);
    }
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNext();
    }, 6000);

    // Clean up the interval on component unmount
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <section className="carousel-section">
      <div className="container-lg container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="slider-wraper">
              <h1 className="section-title overflow-hidden">
                Our Most Recent Products
              </h1>
              <div className="slider" ref={sliderRef}>
                {slidesData.map((slide) => (
                  <div
                    key={slide.id}
                    className={`slides`}
                    style={{ backgroundImage: `url(${slide.img})` }}
                  >
                    <div className="content">
                      <h5 className="product-name">{slide.title}</h5>
                      <p className="description">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="buttons">
                <button className="btn-prev" onClick={handleNext}>
                  <BsChevronLeft />
                </button>
                <button className="btn-next" onClick={handlePrev}>
                  <BsChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider;
