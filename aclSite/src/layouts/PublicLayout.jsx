import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import Cursor from "../components/public/Cursor";
import ReactModal from "../components/public/Modal";

// PublicLayout Component
// eslint-disable-next-line react/prop-types
const PublicLayout = ({ isDarkMode, toggleTheme }) => {
  const [isHovered, setIsHovered] = useState({});
  const [showModal, setShowModal] = useState(true);
  const location = useLocation();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Check if the current path is the homepage
  useEffect(() => {
    setIsHovered();
    // Define animations based on the current route
    if (location.pathname === "/") {
      setIsHovered({
        Hero: { type: "hero" },
        Carousel: { type: "carousel" },
        Ourproduct: { type: "ourproduct" },
        Profile: { type: "profile" },
        News: { type: "news" },
      });
    } else if (location.pathname === "/about") {
      setIsHovered({
        WhoWeAre: { type: "bounce" },
        Mission: { type: "spin" },
        Vision: { type: "expand" },
        Footer: { type: "shrink" },
      });
    }
  }, [location.pathname]);

  return (
    <div className="public-layout">
      {/* Event News Modal - Only displayed on public website pages */}
      <ReactModal show={showModal} onHide={handleCloseModal} />

      <Cursor hoverText={isHovered} />

      {/* Header / Navbar */}
      <header className="header">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </header>

      {/* Main content area */}
      <main className="main-content">
        <Outlet context={{ setCursorHover: setIsHovered }} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
