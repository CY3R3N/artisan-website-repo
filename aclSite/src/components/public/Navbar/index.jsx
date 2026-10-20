import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import { HiMenuAlt3 } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";

import { Dropdown } from "react-bootstrap";
import MenuImg1 from "../../../assets/images/event-3.png";
import MenuImg2 from "../../../assets/images/event-5.png";
import "../Navbar/Navbar.css";

import { Category } from "../../../data/data";
import { HeaderLogo } from "../../../data/icons";

function Navbar({ isDarkMode, toggleTheme }) {
  const [show, setShow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  // Toggle dropdown and navigation background
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
      setIsDropdownOpen2(false);
    }
  };

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // product category
  let dropdownItem = Category.map((item) => {
    return (
      <Dropdown.Item
        as={Link}
        to={`/products-shape/${item.path}`}
        key={item.cat_id}
      >
        {item.cat_name}
      </Dropdown.Item>
    );
  });

  // GASP animation
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);

  //navigation animation
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(logoRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
    });

    tl.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.2,
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 991.99) {
        const scrollY = window.scrollY;

        if (scrollY > 0 && !isDropdownOpen && !isDropdownOpen2) {
          // Scrolled with dropdowns closed
          gsap.to(headerRef.current, { top: "10px" });
          gsap.to(navRef.current, {
            height: "70px",
            backgroundColor: "#000439",
            borderRadius: "40px",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(logoRef.current, {
            height: "70px",
            background: "transparent",
            duration: 0,
            alignItems: "center",
          });
        } else if (scrollY > 0 && (isDropdownOpen || isDropdownOpen2)) {
          // Scrolled with dropdowns open
          gsap.to(headerRef.current, { top: "0px" });
          gsap.to(navRef.current, {
            height: "100px",
            backgroundColor: "transparent",
            borderRadius: "0",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(logoRef.current, {
            height: "100px",
            backgroundColor: "#000439",
            alignItems: "flex-end",
          });
        } else {
          // Not scrolled (default state)
          gsap.to(headerRef.current, { top: "0px" });
          gsap.to(navRef.current, {
            height: "100px",
            backgroundColor: "transparent",
            borderRadius: "0",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(logoRef.current, {
            height: "100px",
            backgroundColor: "#000439",
            alignItems: "flex-end",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen, isDropdownOpen2]);

  // Handle dropdown state changes
  useEffect(() => {
    if (window.innerWidth > 991.99) {
      if (isDropdownOpen || isDropdownOpen2) {
        // Dropdowns are open
        gsap.to(headerRef.current, { top: "0px" });
        gsap.to(navRef.current, {
          height: "100px",
          backgroundColor: "transparent",
          borderRadius: "0",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(logoRef.current, {
          height: "100px",
          backgroundColor: "#000439",
          alignItems: "flex-end",
        });
      } else {
        // Dropdowns are closed
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          // If scrolled, revert to "scrolled" style
          gsap.to(headerRef.current, { top: "10px" });
          gsap.to(navRef.current, {
            height: "70px",
            backgroundColor: "#000439",
            borderRadius: "40px",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(logoRef.current, {
            height: "70px",
            background: "transparent",
            duration: 0,
            alignItems: "center",
          });
        } else {
          // If at the top, revert to default style
          gsap.to(headerRef.current, { top: "0px" });
          gsap.to(navRef.current, {
            height: "100px",
            backgroundColor: "transparent",
            borderRadius: "0",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(logoRef.current, {
            height: "100px",
            backgroundColor: "#000439",
            alignItems: "flex-end",
          });
        }
      }
    }
  }, [isDropdownOpen, isDropdownOpen2]);

  return (
    <nav
      className="fixed-top"
      ref={headerRef}
      style={{
        backgroundColor:
          (isDropdownOpen || isDropdownOpen2) && isLargeScreen
            ? "var(--bg-color)"
            : "transparent",
      }}
    >
      <div className="container-lg container-fluid navigation" ref={navRef}>
        <Link className="brand-logo" to="/" ref={logoRef}>
          <HeaderLogo />
        </Link>

        <Button className="d-lg-none hamburger" onClick={handleShow}>
          <HiMenuAlt3 />
        </Button>

        <Offcanvas show={show} onHide={handleClose} responsive="lg">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text)"
                        : "",
                  }}
                >
                  Home
                </Link>
              </li>

              <Dropdown
                className="nav-item"
                onClick={handleDropdownToggle2}
                ref={dropdownRef2}
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic-2"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text) !important"
                        : "",
                  }}
                >
                  About
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align={"start"}
                  style={{
                    borderTop:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "1px solid var(--border-color)"
                        : "",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="d-lg-flex d-none align-items-center border-end h-100">
                          <h2 style={{ color: "var(--text)" }}>
                            Dining is Style
                          </h2>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mega-menu-dd-item">
                          <Dropdown.Item as={Link} to="/our-story">
                            Out Story
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/chairman-message">
                            Message From Chairman
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="board-of-directors">
                            Board Of Directors
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="executive-committee">
                            Executive Committee
                          </Dropdown.Item>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="menu-img d-lg-block d-none">
                          <img src={MenuImg1} alt="menu-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown
                className="nav-item"
                onClick={handleDropdownToggle}
                ref={dropdownRef}
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text) !important"
                        : "",
                  }}
                >
                  Products
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align={"start"}
                  style={{
                    borderTop:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "1px solid var(--border-color)"
                        : "",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="d-lg-flex d-none align-items-center border-end h-100">
                          <h2 style={{ color: "var(--text)" }}>
                            The Perfect Touch For Every Table Setting
                          </h2>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mega-menu-dd-item">{dropdownItem}</div>
                      </div>
                      <div className="col-md-3">
                        <div className="menu-img d-lg-block d-none">
                          <img src={MenuImg2} alt="menu-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/catalog"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text)"
                        : "",
                  }}
                >
                  Catalog
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/career"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text)"
                        : "",
                  }}
                >
                  Career
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/news-events"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text)"
                        : "",
                  }}
                >
                  News
                </Link>
              </li> */}
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item d-lg-block d-none">
                <button
                  onClick={toggleTheme}
                  className="theme-toggle-btn"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text)"
                        : "",
                  }}
                >
                  {isDarkMode ? <FiSun /> : <FiMoon />}
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link contact" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item d-lg-none d-block">
                <button
                  onClick={toggleTheme}
                  className="theme-toggle-btn"
                  style={{
                    color:
                      (isDropdownOpen || isDropdownOpen2) && isLargeScreen
                        ? "var(--text)"
                        : "",
                  }}
                >
                  {isDarkMode ? <FiSun /> : <FiMoon />}
                </button>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
}

export default Navbar;
