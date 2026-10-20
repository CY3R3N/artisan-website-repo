import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import BackVideo from "../../../assets/acl-video.mp4";
import { api, STORAGE_BASE_URL } from "../../../services/api";
import "../Hero/Hero.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  const { setCursorHover } = useOutletContext() || {};
  const animation = setCursorHover?.Hero;

  const [tagline, setTagline] = useState("A Symphony of Style");
  const [videoUrl, setVideoUrl] = useState(BackVideo);

  useEffect(() => {
    let isMounted = true;
    api
      .getSection("hero")
      .then((data) => {
        if (!isMounted || !data) return;
        if (data.tagline) setTagline(data.tagline);
        if (data.media_path) {
          const url = data.media_path.startsWith("http")
            ? data.media_path
            : `${STORAGE_BASE_URL}/${data.media_path}`;
          setVideoUrl(url);
        }
      })
      .catch(() => {
        // Fallback to default
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(() => {
    gsap.from(".tagline h1", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.5,
    });
  }, [tagline]);

  return (
    <section
      className={`hero ${animation?.type || ""}`}
      onMouseEnter={() => setCursorHover && setCursorHover("hero")}
      onMouseLeave={() => setCursorHover && setCursorHover(null)}
    >
      <video key={videoUrl} autoPlay loop muted playsInline>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="tagline">
        <h1>{tagline}</h1>
      </div>
    </section>
  );
}

export default Hero;
