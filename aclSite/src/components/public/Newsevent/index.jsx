import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import Newscard from "../Newscard";
import { api, STORAGE_BASE_URL } from "../../../services/api";
import "../Newsevent/Newsevent.css";

import NewsImg from "../../../assets/images/blog/news.jpg";
import NewsImg2 from "../../../assets/images/blog/trophy-18-19.jpg";
import NewsImg3 from "../../../assets/images/blog/trophy-21-22.jpg";

const fallbackNews = [
  {
    id: 1,
    img: NewsImg3,
    date: "11th July, 2024",
    title:
      "Honorable Chairman Mr. Nader Khan Receiving National Export Trophy 2021-2022",
  },
  {
    id: 2,
    img: NewsImg,
    date: "8th November, 2023",
    title:
      "Honorable Chief Executive Officer (CEO) Mr. Mamunur Rashid Receiving National Export Trophy 2020-2021",
  },
  {
    id: 3,
    img: NewsImg2,
    date: "22th November, 2022",
    title:
      "Honorable Chief Executive Officer (CEO) Mr. Mamunur Rashid Receiving National Export Trophy 2018-2019",
  },
];

const fallbackImgMap = {
  1: NewsImg3,
  2: NewsImg,
  3: NewsImg2,
};

function Newsevent() {
  const [news, setNews] = useState(fallbackNews);

  useEffect(() => {
    let isMounted = true;
    api
      .getNews()
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;
        const mapped = data.map((a, index) => ({
          id: a.id,
          title: a.title,
          date: a.date_text || a.date,
          img:
            a.image_url ||
            (a.image_path
              ? `${STORAGE_BASE_URL}/${a.image_path}`
              : fallbackImgMap[a.id] || fallbackNews[index % fallbackNews.length].img),
        }));
        setNews(mapped);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".newscard",
        scroller: "body",
        start: "top 80%",
      },
    });

    tl.from(".ne-word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".newscard", {
      y: 200,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
  }, [news]);

  let mapNews = news.map((item) => {
    return (
      <div className="col-sm-12 col-md-4" key={item.id}>
        <Newscard newsData={item} />
      </div>
    );
  });

  return (
    <section className="news-events">
      <div className="container-lg container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="component-title mx-auto">
              {"News & Events".split(" ").map((word, index) => (
                <div className="ne-word" key={index}>
                  {word}
                </div>
              ))}
            </div>
          </div>
          {mapNews}
        </div>
      </div>
    </section>
  );
}

export default Newsevent;
