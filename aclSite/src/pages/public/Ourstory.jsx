import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Pagetitle from "../../components/public/Pagetitle";

import Qcard from "../../components/public/Qcard";
import About from "../../components/public/About";
import Technology from "../../components/public/Technology";
import Count from "../../components/public/Count";
import Mission from "../../components/public/Mission";

import {
  VarietyShape,
  ScretchSafe,
  ThermalSafe,
  OvenSafe,
  MicrowaveSafe,
  EdgeChippingSafe,
  DishwasherSafe,
  FreezerSafe,
} from "../../data/icons";

const qualities = [
  {
    id: 1,
    icon: MicrowaveSafe,
    title: "Microwave Safe",
    text: "Designed for safe and convenient microwave heating.",
  },
  {
    id: 2,
    icon: DishwasherSafe,
    title: "Dishwasher Safe",
    text: "Easy to clean, ensuring long-lasting shine and durability.",
  },
  {
    id: 3,
    icon: ThermalSafe,
    title: "Thermal Shock Resistant",
    text: "Withstands sudden temperature changes without cracking.",
  },
  {
    id: 4,
    icon: OvenSafe,
    title: "Oven Safe",
    text: "Perfect for baking and high-temperature cooking needs.",
  },
  {
    id: 5,
    icon: FreezerSafe,
    title: "Freeze Safe",
    text: "Ideal for storing food in extremely low temperatures.",
  },
  {
    id: 6,
    icon: ScretchSafe,
    title: "Scratch Resistant",
    text: "Maintains a flawless surface even after repeated use.",
  },
  {
    id: 7,
    icon: EdgeChippingSafe,
    title: "Edge Chipping Resistant",
    text: "Built strong to resist chipping and everyday wear.",
  },
  {
    id: 8,
    icon: VarietyShape,
    title: "Variety of Shape & Style",
    text: "Elegant designs to suit every dining experience.",
  },
];

const qualitiesMap = qualities.map((qlty) => {
  return (
    <div className="col-6 col-md-4 col-lg-3" key={qlty.id}>
      <Qcard icon={qlty.icon} title={qlty.title} text={qlty.text} />
    </div>
  );
});

function Ourstory() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".quality",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 1,
      },
    });

    tl.from(".wh-word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".qcard", {
      y: 200,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    });
  });

  return (
    <section className="our-story">
      <Pagetitle title="About Us" />

      <About />

      <Technology />

      <div className="quality">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="component-title mx-auto">
                {"Why Artisan".split(" ").map((word, index) => (
                  <div className="wh-word" key={index}>
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">{qualitiesMap}</div>
        </div>
      </div>

      <Count />

      <Mission />
    </section>
  );
}

export default Ourstory;
