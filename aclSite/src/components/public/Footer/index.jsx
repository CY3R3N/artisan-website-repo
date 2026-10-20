import React from "react";
import { Link } from "react-router-dom";

import { IoIosArrowRoundForward } from "react-icons/io";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import FinlayLogo from "../../../assets/images/finlay-logo.svg";
import "../Footer/Footer.css";
import { FooterLogo } from "../../../data/icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="container-lg container-fluid">
        <div className="row g-lg-4 g-5">
          <div className="col-lg-8 col-sm-12">
            <div className="row g-lg-4 g-5">
              <div className="col-lg-3 col-sm-12">
                <div className="footer-logo">
                  <Link className="footer-brand-logo" to="/">
                    <FooterLogo />
                  </Link>

                  <p>a sister concern of</p>
                  <img
                    className="parent-logo"
                    src={FinlayLogo}
                    alt="Parent Logo"
                  />
                </div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="footer-link">
                  <h5 className="link-title">Company</h5>
                  <ul>
                    <li>
                      <Link to="our-story">
                        <IoIosArrowRoundForward />
                        <span>Who we are</span>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="">
                        <IoIosArrowRoundForward />
                        <span>Prodcts</span>
                      </Link>
                    </li> */}
                    <li>
                      <Link to="contact">
                        <IoIosArrowRoundForward />
                        <span>Contact</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="career">
                        <IoIosArrowRoundForward />
                        <span>Career</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="footer-link">
                  <h5 className="link-title">Prodcts</h5>
                  <ul>
                    <li>
                      <Link to="products-shape/plain-shape">
                        <IoIosArrowRoundForward />
                        <span>Plain</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="products-shape/square-shape">
                        <IoIosArrowRoundForward />
                        <span>Square</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="products-shape/horeca-shape">
                        <IoIosArrowRoundForward />
                        <span>Horeca</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="products-shape/round-shape">
                        <IoIosArrowRoundForward />
                        <span>Round</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="products-shape/mug-collection">
                        <IoIosArrowRoundForward />
                        <span>Mug</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="products-shape/accessories">
                        <IoIosArrowRoundForward />
                        <span>Accessories</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="footer-link">
                  <h5 className="link-title">Prodcts</h5>
                  <ul>
                    <li>
                      <Link to="">
                        <IoIosArrowRoundForward />
                        <span>News & Events</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="catalog">
                        <IoIosArrowRoundForward />
                        <span>Request Catalog</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <IoIosArrowRoundForward />
                        <span>Awards</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12">
            <div className="footer-subscribe">
              <h5 className="link-title">Subscribe Our Newsletter</h5>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="your email address"
                />
                <button className="btn btn-subscribe" type="submit">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="footer-legal">
          <div className="row gy-lg-0 gy-3">
            <div className="col-sm-12 col-md-4">
              <p className="copy-text">
                © 2024, All Right Reserved Artisan Ceramics Ltd.
              </p>
            </div>
            <div className="col-sm-12 col-md-4">
              <ul className="social-links">
                <li>
                  <Link to="https://www.facebook.com/ArtisanCeramicsLtd">
                    <FaFacebookSquare />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.instagram.com/artisanceramicsltd/">
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.linkedin.com/company/artisan-ceramics-limited/">
                    <FaLinkedin />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.youtube.com/@artisanceramicslimited889">
                    <FaYoutube />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-4">
              <p className="copy-text float-lg-end">
                Design & Developed by{" "}
                <Link to="https://rcodestudio.com/">RCodeStudio</Link>
                {" · "}
                <Link to="/admin" className="text-decoration-none opacity-75">Admin</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
