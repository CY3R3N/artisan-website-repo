import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Pagetitle from "../../components/public/Pagetitle";
import Team from "../../components/public/Team";
import { api, STORAGE_BASE_URL } from "../../services/api";

import t1 from "../../assets/images/t-1.jpg";
import t2 from "../../assets/images/t-2.jpg";
import t3 from "../../assets/images/t-3.jpg";
import t4 from "../../assets/images/t-4.jpg";
import t5 from "../../assets/images/t-5.jpg";
import t6 from "../../assets/images/t-6.jpg";

const initialDirectors = [
  {
    id: 1,
    name: "Mr. Azam J Chowdhury",
    designation: "Director",
    position: "Director",
    img: t1,
  },
  {
    id: 3,
    name: "Mr. Mirza Salman Ispahani",
    designation: "Director",
    position: "Director",
    img: t3,
  },
  {
    id: 4,
    name: "Mr. Matiur Rahman",
    designation: "Director",
    position: "Director",
    img: t4,
  },
  {
    id: 5,
    name: "Mr. Anis Ahmed",
    designation: "Director",
    position: "Director",
    img: t5,
  },
  {
    id: 6,
    name: "Mr. A.Q.I. Chowdhury (OBE)",
    designation: "Director",
    position: "Director",
    img: t6,
  },
];

const fallbackImgs = [t1, t2, t3, t4, t5, t6];

function DirectorsBoard() {
  const [directors, setDirectors] = useState(initialDirectors);

  useEffect(() => {
    let isMounted = true;
    api
      .getTeam("director")
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;
        const mapped = data.map((d, index) => ({
          id: d.id,
          name: d.name,
          designation: d.designation,
          position: d.designation,
          img:
            d.image_url ||
            (d.image_path
              ? `${STORAGE_BASE_URL}/${d.image_path}`
              : fallbackImgs[index % fallbackImgs.length]),
        }));
        setDirectors(mapped);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tmCard = document.querySelectorAll(".tm-card");
    tmCard.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          scroller: "body",
        },
        y: 200,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      });
    });
  }, [directors]);

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".brd-title",
        scroller: "body",
        start: "top 70%",
      },
    });

    tl.from(".brd-title", {
      y: 200,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });

    tl.from(".brd-title-text", {
      y: 200,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
  }, []);

  let directorMap = directors.map((director) => {
    return (
      <div className="col-sm-12 col-md-4 col-lg-4" key={director.id}>
        <Team
          teamImg={director.img}
          tmName={director.name}
          tmPosition={director.position}
        />
      </div>
    );
  });

  return (
    <section>
      <Pagetitle title="Board Of Directors" />

      <div className="board-directors py-100">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="brd-title">
                Meet Our<br></br>Honorable Directors
              </h1>
              <p className="brd-title-text">
                Meet our esteemed Directors, visionaries dedicated to steering
                our company towards success. With their wealth of experience,
                leadership, and commitment to excellence, they guide our mission
                and values, ensuring continued growth and innovation.
              </p>
            </div>
          </div>
          <div className="row g-3">{directorMap}</div>
        </div>
      </div>
    </section>
  );
}

export default DirectorsBoard;
