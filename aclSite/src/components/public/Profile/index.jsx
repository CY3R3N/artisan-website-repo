import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ThumbImg from "../../../assets/images/acl-fact.jpg";
import ProfileVideo from "../../../assets/profile_video.mp4";
import { IoPlay } from "react-icons/io5";
import { api, STORAGE_BASE_URL } from "../../../services/api";
import "../Profile/Profile.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function Profile() {
  const { setCursorHover } = useOutletContext() || {};
  const animation = setCursorHover?.Profile;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [title, setTitle] = useState("The glorious journey of a decade");
  const [videoUrl, setVideoUrl] = useState(ProfileVideo);
  const [thumbUrl, setThumbUrl] = useState(ThumbImg);

  useEffect(() => {
    let isMounted = true;
    api
      .getSection("profile")
      .then((data) => {
        if (!isMounted || !data) return;
        if (data.title) setTitle(data.title);
        if (data.media_path) {
          const url = data.media_path.startsWith("http")
            ? data.media_path
            : `${STORAGE_BASE_URL}/${data.media_path}`;
          setVideoUrl(url);
        }
        if (data.thumb_path) {
          const url = data.thumb_path.startsWith("http")
            ? data.thumb_path
            : `${STORAGE_BASE_URL}/${data.thumb_path}`;
          setThumbUrl(url);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const handlePauseVideo = () => {
    setIsVideoPlaying(false);
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".profile-sec-title",
        scroller: "body",
        start: "top 80%",
      },
    });
    tl.from(".profile-sec-title", {
      y: 200,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
    tl.from(".profile-video-wraper", {
      y: 300,
      opacity: 0,
      stagger: 0.2,
    });
  }, [title]);

  return (
    <section
      className={`profile ${animation?.type || ""}`}
      onMouseEnter={() =>
        setCursorHover && setCursorHover(isVideoPlaying ? "Pause" : "Play")
      }
      onMouseLeave={() => setCursorHover && setCursorHover(null)}
    >
      <div className="container-lg container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="profile-sec-title">{title}</h1>
          </div>
          <div className="col-sm-12">
            <div className="profile-video-wraper">
              {isVideoPlaying ? (
                <video
                  key={videoUrl}
                  className="video-player"
                  width="100%"
                  height="100%"
                  controls
                  autoPlay
                  onPause={handlePauseVideo}
                  onPlay={handlePlayVideo}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <img
                    className="thumb-img"
                    src={thumbUrl}
                    alt="thumb-img"
                    onClick={handlePlayVideo}
                  />
                  <button className="play-button" onClick={handlePlayVideo}>
                    <IoPlay />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
