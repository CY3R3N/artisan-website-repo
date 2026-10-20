import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import Pagetitle from "../../components/public/Pagetitle";

import { LuClock } from "react-icons/lu";
import { RiParentFill } from "react-icons/ri";
import {
  MdOutlineHealthAndSafety,
  MdOutlineAirplanemodeActive,
} from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";

import careerImg from "../../assets/images/office.png";
import Careercard from "../../components/public/Careercard";
import Jobcard from "../../components/public/Jobcard";

function Career() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Creative Graphics Designer",
      job_type: "Full Time",
      location: "Head Office",
      salary_range: "Negotiation",
      deadline: "28 Feb, 2025",
    },
  ]);

  useEffect(() => {
    let isMounted = true;
    api
      .getJobs()
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;
        setJobs(data);
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
        trigger: ".career",
        scroller: "body",
        // markers: true,
        start: "top 80%",
        // scrub: 1,
      },
    });

    tl.from(".career-img-wraper", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      delay: 0.1,
    });

    tl.from(".anm", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      stagger: {
        each: 0.1,
      },
    });
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".join-with-us",
        scroller: "body",
        // markers: true,
        start: "top 80%",
        // scrub: 1,
      },
    });

    tl.from(".jwu-word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".jwu-text", {
      y: 100,
      opacity: 0,
      duration: 0.5,
    });

    tl.from(".career-card", {
      y: 200,
      opacity: 0,
      duration: 0.5,
      stagger: {
        each: 0.1,
      },
    });
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".join-us-td",
        scroller: "body",
        // markers: true,
        start: "top 80%",
        // scrub: 1,
      },
    });

    tl.from(".jut-word", {
      y: 100,
      stagger: {
        each: 0.1,
      },
    });

    tl.from(".jutd-text", {
      y: 100,
      opacity: 0,
      duration: 0.5,
    });

    tl.from(".job-card", {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    });
  }, []);

  const careerBenefits = [
    {
      id: 1,
      icon: LuClock,
      title: "Flexible Work",
      text: "Work-life balance through flexible schedules and remote work options.",
    },
    {
      id: 2,
      icon: RiParentFill,
      title: "Parental Leave",
      text: "Supportive leave policies for parents to nurture family needs and responsibilities.",
    },
    {
      id: 3,
      icon: MdOutlineHealthAndSafety,
      title: "Health Insurance",
      text: " Comprehensive medical coverage for employees' health and wellness.",
    },
    {
      id: 4,
      icon: IoSchoolOutline,
      title: "Continuing Training",
      text: "Empowering career growth with ongoing learning and development opportunities.",
    },
    {
      id: 5,
      icon: TbCurrencyTaka,
      title: "Company Equity",
      text: "Ownership opportunities through equity programs, aligning employee success with company growth.",
    },
    {
      id: 6,
      icon: MdOutlineAirplanemodeActive,
      title: "Vacation Policy",
      text: "Generous paid time off to refresh and maintain productivity.",
    },
  ];

  const benefitMap = careerBenefits.map((benefit, index) => {
    return (
      <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
        <Careercard
          icon={benefit.icon}
          title={benefit.title}
          text={benefit.text}
        />
      </div>
    );
  });

  return (
    <section className="career">
      <Pagetitle title="Join Our Team" />

      <div className="container py-100">
        <div className="row gx-lg-5 gy-lg-0 gy-5">
          <div className="col-sm-12 col-md-12 col-lg-7">
            <div className="career-img-wraper">
              <img src={careerImg} alt="careerImg" />
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-5">
            <div className="career-description">
              <h1 className="anm">Let's make great team together</h1>
              <p className="anm">
                At Artisan Ceramics, we believe that our success is built on the
                passion, creativity, and dedication of our people. When you join
                our team, you become part of a family that values collaboration,
                innovation, and excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container join-with-us">
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <div className="text-center mb-5">
              <div className="component-title mb-3 mx-auto">
                {"Why Join Us".split(" ").map((word, index) => (
                  <div className="jwu-word" key={index}>
                    {word}
                  </div>
                ))}
              </div>
              <p className="text-color-drk jwu-text mb-5">
                We’re always on the lookout for talented, ambitious individuals
                who are ready to bring fresh ideas, enthusiasm, and commitment
                to our team. Whether you’re an experienced professional or just
                starting your career, there’s a place for you here.
              </p>
            </div>
          </div>
        </div>
        <div className="row g-lg-5 gy-2 mt-5">{benefitMap}</div>
      </div>

      <div className="container join-us-td py-100">
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <div className="text-center mb-5">
              <div className="component-title mb-3 mx-auto">
                {"Join Us Today".split(" ").map((word, index) => (
                  <div className="jut-word" key={index}>
                    {word}
                  </div>
                ))}
              </div>

              <p className="text-color-drk jutd-text mb-5">
                Together, we can craft more than just ceramics — we can craft a
                future full of possibilities. Let’s create something
                extraordinary.
              </p>
            </div>
          </div>
        </div>
        <div className="row gy-2">
          <div className="col-sm-12">
            {jobs.map((job) => (
              <Jobcard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Career;
