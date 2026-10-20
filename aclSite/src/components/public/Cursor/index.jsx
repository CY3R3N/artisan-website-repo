import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "../Cursor/Cursor.css";

const Cursor = ({ hoverText }) => {
  const cursorRef = useRef(null);

  // Move cursor with GSAP
  useEffect(() => {
    const moveCursor = (event) => {
      gsap.to(cursorRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 1,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Handle hover effect
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorStyles = {
      hero: { width: 80, height: 80, bg: "rgb(59, 30, 84)", textSize: 18 },
      Play: { width: 100, height: 100, bg: "#FF4A24", textSize: 18 },
      Pause: { width: 100, height: 100, bg: "#FF4A24", textSize: 18 },
      news: { width: 80, height: 80, bg: "#000877", textSize: 18 },
      catalog: { width: 80, height: 80, bg: "#500073", textSize: 18 },
      default: { width: 10, height: 10, bg: "rgb(4, 0, 255)", textSize: 0 },
    };

    const { width, height, bg, textSize } =
      cursorStyles[hoverText] || cursorStyles.default;

    gsap.to(cursor, {
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: "50%",
      fontSize: `${textSize}px`,
      lineHeight: `${height}px`,
      backgroundColor: bg,
      duration: 1,
      ease: "power2.out",
    });
  }, [hoverText]);

  // Memoized text mapping
  const hoverTextMapping = {
    hero: "Scroll",
    Play: "Play",
    Pause: "Pause",
    carousel: "Next",
    news: "More",
    catalog: "Request",
  };

  return (
    <div className="custom-cursor" ref={cursorRef}>
      {hoverText && (
        <span className="cursor-text">{hoverTextMapping[hoverText] || ""}</span>
      )}
    </div>
  );
};

export default Cursor;
