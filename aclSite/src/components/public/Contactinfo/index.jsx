import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import "../Contactinfo/Contactinfo.css";

function Contactinfo() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline();
    tl.from(".cu-word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".ci-text", {
      y: 100,
      opacity: 0,
    });

    tl.from(".cu-item", {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    });
  });

  return (
    <div className="contact-info">
      <div className="component-title">
        {"Contact Us".split(" ").map((word, index) => (
          <div className="cu-word" key={index}>
            {word}
          </div>
        ))}
      </div>
      <p className="text-color-drk ci-text mb-5">
        Have questions or need assistance? Reach out to us anytime! We're here
        to help with your inquiries, feedback, or support needs.
      </p>
      <div className="row">
        <div className="col-sm-12 col-md-6 cu-item">
          <h5 className="mt-4 mb-3">Corporate Office</h5>
          <p className="text-color-drk mb-0">Artisan Ceramics Ltd.</p>
          <p className="text-color-drk mb-0">
            House: 16, Road: 07, Sector: 01, Uttara, Dhaka - 1230, Bangladesh
          </p>
        </div>

        <div className="col-sm-12 col-md-6 cu-item">
          <h5 className="mt-4 mb-3">Factory</h5>
          <p className="text-color-drk mb-0">Artisan Ceramics Ltd.</p>
          <p className="text-color-drk mb-0">
            Shirirchala, Bagher Bazar, Bhabanipur, Gazipur - 1701, Bangladesh
          </p>
        </div>

        <div className="col-sm-12 col-md-6 cu-item">
          <h5 className="mt-4 mb-3">Contact</h5>
          <p className="text-color-drk mb-0">
            Email:{" "}
            <a
              className="text-decoration-none"
              href="mailto:acl-ho@artisan.com.bd"
            >
              acl-ho@artisan.com.bd
            </a>
          </p>
          <p className="text-color-drk mb-0">
            Phone:{" "}
            <a className="text-decoration-none" href="tel:+880248953588">
              +880 248 953 588
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contactinfo;
