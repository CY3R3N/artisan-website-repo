import React, { useState, useEffect } from "react";
import {
  FiVideo,
  FiUploadCloud,
  FiSave,
  FiCheckCircle,
  FiPlay,
  FiImage,
  FiClock,
  FiUser,
  FiInfo,
} from "react-icons/fi";
import { api, STORAGE_BASE_URL } from "../../services/api";

function SectionsManager() {
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Hero section state
  const [hero, setHero] = useState({
    title: "Hero Banner",
    tagline: "A Symphony of Style",
    subtitle: "Crafting fine porcelain and ceramics with timeless perfection.",
    media_path: null,
  });
  const [heroVideoFile, setHeroVideoFile] = useState(null);
  const [heroVideoPreview, setHeroVideoPreview] = useState(null);

  // Profile journey state
  const [profile, setProfile] = useState({
    title: "The glorious journey of a decade",
    subtitle: "Our Factory & Heritage",
    content:
      "At Artisan Ceramics, precision meets passion. Our state-of-the-art manufacturing plant brings world-class porcelain dinnerware to prestigious tables across the globe.",
    media_path: null,
    thumb_path: null,
  });
  const [profileVideoFile, setProfileVideoFile] = useState(null);
  const [profileThumbFile, setProfileThumbFile] = useState(null);
  const [profileVideoPreview, setProfileVideoPreview] = useState(null);
  const [profileThumbPreview, setProfileThumbPreview] = useState(null);

  // Upcoming popup state
  const [popup, setPopup] = useState({
    title: "ambiente",
    subtitle: "6.-10.2.2026",
    content: "frankfurt/main",
    data: {
      event_name: "Ambiente Frankfurt 2026",
      target_date: "2026-02-06T23:59:59",
      hall: "Halle Standnr./Hall",
      stand: "Stand No. --",
      is_active: true,
    },
  });

  // Chairman message state
  const [chairman, setChairman] = useState({
    title: "Chairman Message",
    tagline: "Leading with Vision, Passion & Craftsmanship",
    content:
      "Artisan Ceramics was founded on a simple yet enduring premise: to blend artisanal heritage with modern ceramic innovation. We take immense pride in representing Bangladeshi manufacturing excellence on the world stage.",
    data: {
      chairman_name: "Mr. Nader Khan",
      designation: "Chairman, Artisan Ceramics Limited",
    },
    media_path: null,
  });
  const [chairmanImageFile, setChairmanImageFile] = useState(null);
  const [chairmanImagePreview, setChairmanImagePreview] = useState(null);

  // Load sections from backend
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sections = await api.getSections();
        if (sections.hero) setHero((prev) => ({ ...prev, ...sections.hero }));
        if (sections.profile)
          setProfile((prev) => ({ ...prev, ...sections.profile }));
        if (sections.upcoming_popup)
          setPopup((prev) => ({ ...prev, ...sections.upcoming_popup }));
        if (sections.chairman_message)
          setChairman((prev) => ({ ...prev, ...sections.chairman_message }));
      } catch (err) {
        console.warn("Using default section contents while API is offline:", err);
      }
    };
    fetchSections();
  }, []);

  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // 1. Save Hero Section
  const handleSaveHero = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", hero.title);
      formData.append("tagline", hero.tagline);
      formData.append("subtitle", hero.subtitle);
      if (heroVideoFile) {
        formData.append("media", heroVideoFile);
      }

      const res = await api.updateSection("hero", formData);
      if (res.section) setHero(res.section);
      setHeroVideoFile(null);
      showNotification("Hero section & video updated successfully in MySQL!");
    } catch (err) {
      alert("Failed to save hero section: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 2. Save Profile Section
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", profile.title);
      formData.append("subtitle", profile.subtitle);
      formData.append("content", profile.content);
      if (profileVideoFile) {
        formData.append("media", profileVideoFile);
      }
      if (profileThumbFile) {
        formData.append("thumb", profileThumbFile);
      }

      const res = await api.updateSection("profile", formData);
      if (res.section) setProfile(res.section);
      setProfileVideoFile(null);
      setProfileThumbFile(null);
      showNotification(
        "Profile journey video, thumbnail & description saved to database!"
      );
    } catch (err) {
      alert("Failed to save profile section: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 3. Save Popup Section
  const handleSavePopup = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", popup.title);
      formData.append("subtitle", popup.subtitle);
      formData.append("content", popup.content);
      formData.append("data", JSON.stringify(popup.data));

      const res = await api.updateSection("upcoming_popup", formData);
      if (res.section) setPopup(res.section);
      showNotification("Upcoming event modal & countdown updated!");
    } catch (err) {
      alert("Failed to save popup settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 4. Save Chairman Message
  const handleSaveChairman = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", chairman.title);
      formData.append("tagline", chairman.tagline);
      formData.append("content", chairman.content);
      formData.append("data", JSON.stringify(chairman.data));
      if (chairmanImageFile) {
        formData.append("media", chairmanImageFile);
      }

      const res = await api.updateSection("chairman_message", formData);
      if (res.section) setChairman(res.section);
      setChairmanImageFile(null);
      showNotification("Chairman message & portrait updated successfully!");
    } catch (err) {
      alert("Failed to save chairman section: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid px-lg-4">
      <div className="mb-4">
        <h1 className="admin-header-title">Homepage & Page Sections</h1>
        <p className="admin-header-subtitle">
          Dynamically replace videos, headlines, descriptions, and media across the entire website.
        </p>
      </div>

      {successMessage && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <FiCheckCircle className="fs-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "hero" ? "active" : ""}`}
            onClick={() => setActiveTab("hero")}
          >
            <FiVideo className="me-1" /> Hero Video & Tagline
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <FiPlay className="me-1" /> Profile Journey Video
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "popup" ? "active" : ""}`}
            onClick={() => setActiveTab("popup")}
          >
            <FiClock className="me-1" /> Event Modal Popup
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "chairman" ? "active" : ""}`}
            onClick={() => setActiveTab("chairman")}
          >
            <FiUser className="me-1" /> Chairman Message
          </button>
        </li>
      </ul>

      {/* Tab 1: Hero Section */}
      {activeTab === "hero" && (
        <div className="admin-table-card p-4">
          <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FiVideo className="text-primary" /> Hero Background Video & Tagline
          </h4>
          <p className="text-muted small mb-4">
            Upload an MP4 video to replace the main hero loop. Video path is saved in MySQL and streamed directly to visitors.
          </p>

          <form onSubmit={handleSaveHero}>
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Hero Tagline</label>
                  <input
                    type="text"
                    className="form-control"
                    value={hero.tagline || ""}
                    onChange={(e) =>
                      setHero((prev) => ({ ...prev, tagline: e.target.value }))
                    }
                    placeholder="A Symphony of Style"
                    required
                  />
                  <small className="text-muted">
                    Displayed prominently in the center of the homepage.
                  </small>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Upload New Video (MP4)</label>
                  <div className="border border-2 border-dashed rounded p-3 text-center">
                    <FiUploadCloud className="fs-1 text-primary mb-2" />
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      className="form-control mb-2"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setHeroVideoFile(file);
                          setHeroVideoPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <small className="text-muted d-block">
                      Recommended: 1080p MP4, H.264 encoded, under 50MB.
                    </small>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary d-inline-flex align-items-center gap-2"
                >
                  <FiSave />
                  {saving ? "Saving to MySQL..." : "Save Hero Section"}
                </button>
              </div>

              <div className="col-12 col-lg-6">
                <div className="border rounded p-3 bg-light-subtle h-100">
                  <label className="form-label fw-bold d-block mb-2">
                    Live Video Preview
                  </label>
                  {heroVideoPreview || hero.media_path ? (
                    <video
                      key={heroVideoPreview || hero.media_path}
                      className="w-100 rounded shadow-sm"
                      controls
                      autoPlay
                      muted
                      loop
                      style={{ maxHeight: "320px", objectFit: "cover" }}
                    >
                      <source
                        src={
                          heroVideoPreview ||
                          (hero.media_path?.startsWith("http")
                            ? hero.media_path
                            : `${STORAGE_BASE_URL}/${hero.media_path}`)
                        }
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <div className="p-5 text-center text-muted">
                      Currently using default bundled video (acl-video.mp4). Upload an MP4 to replace it.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Profile Journey */}
      {activeTab === "profile" && (
        <div className="admin-table-card p-4">
          <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FiPlay className="text-primary" /> Profile Video & Journey Section
          </h4>
          <p className="text-muted small mb-4">
            Manage "The glorious journey of a decade" section on the homepage, including corporate profile video, cover thumbnail, and headline.
          </p>

          <form onSubmit={handleSaveProfile}>
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Section Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.title || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="The glorious journey of a decade"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description / Story Text</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    value={profile.content || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="Story and corporate profile description..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Upload Profile Video (MP4)</label>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="form-control"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfileVideoFile(file);
                        setProfileVideoPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Upload Cover Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfileThumbFile(file);
                        setProfileThumbPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary d-inline-flex align-items-center gap-2"
                >
                  <FiSave />
                  {saving ? "Saving..." : "Save Profile Section"}
                </button>
              </div>

              <div className="col-12 col-lg-6">
                <div className="border rounded p-3 bg-light-subtle h-100">
                  <label className="form-label fw-bold d-block mb-2">
                    Media Previews
                  </label>
                  {profileVideoPreview || profile.media_path ? (
                    <video
                      key={profileVideoPreview || profile.media_path}
                      className="w-100 rounded mb-3 shadow-sm"
                      controls
                      style={{ maxHeight: "240px", objectFit: "cover" }}
                    >
                      <source
                        src={
                          profileVideoPreview ||
                          (profile.media_path?.startsWith("http")
                            ? profile.media_path
                            : `${STORAGE_BASE_URL}/${profile.media_path}`)
                        }
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <div className="p-3 text-center text-muted small border mb-3">
                      Using default profile_video.mp4.
                    </div>
                  )}

                  {profileThumbPreview || profile.thumb_path ? (
                    <div>
                      <small className="text-muted d-block mb-1">
                        Cover Thumbnail Preview:
                      </small>
                      <img
                        src={
                          profileThumbPreview ||
                          (profile.thumb_path?.startsWith("http")
                            ? profile.thumb_path
                            : `${STORAGE_BASE_URL}/${profile.thumb_path}`)
                        }
                        alt="Profile Thumbnail"
                        className="img-fluid rounded border"
                        style={{ maxHeight: "150px" }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Event Modal Popup */}
      {activeTab === "popup" && (
        <div className="admin-table-card p-4">
          <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FiClock className="text-primary" /> Upcoming Event Popup & Countdown
          </h4>
          <p className="text-muted small mb-4">
            Controls the interactive countdown popup that appears for visitors (e.g. Ambiente Frankfurt / Ceramic Expo).
          </p>

          <form onSubmit={handleSavePopup}>
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="mb-3 form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="popupActive"
                    checked={popup.data?.is_active ?? true}
                    onChange={(e) =>
                      setPopup((prev) => ({
                        ...prev,
                        data: { ...prev.data, is_active: e.target.checked },
                      }))
                    }
                  />
                  <label className="form-check-label fw-bold" htmlFor="popupActive">
                    Show Popup on Website
                  </label>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Fair / Event Logo Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={popup.title || ""}
                    onChange={(e) =>
                      setPopup((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="ambiente"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Date Range Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={popup.subtitle || ""}
                    onChange={(e) =>
                      setPopup((prev) => ({ ...prev, subtitle: e.target.value }))
                    }
                    placeholder="6.-10.2.2026"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">City / Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={popup.content || ""}
                    onChange={(e) =>
                      setPopup((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="frankfurt/main"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Stand / Booth Details</label>
                  <input
                    type="text"
                    className="form-control"
                    value={popup.data?.stand || ""}
                    onChange={(e) =>
                      setPopup((prev) => ({
                        ...prev,
                        data: { ...prev.data, stand: e.target.value },
                      }))
                    }
                    placeholder="Stand No. --"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Countdown Target Date</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={
                      popup.data?.target_date
                        ? popup.data.target_date.slice(0, 16)
                        : "2026-02-06T23:59"
                    }
                    onChange={(e) =>
                      setPopup((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          target_date: e.target.value + ":00",
                        },
                      }))
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary d-inline-flex align-items-center gap-2"
                >
                  <FiSave />
                  {saving ? "Saving..." : "Save Popup Settings"}
                </button>
              </div>

              <div className="col-12 col-md-6">
                <div className="border rounded p-4 bg-light-subtle">
                  <h6 className="fw-bold mb-3">Popup Card Preview</h6>
                  <div
                    style={{
                      width: "280px",
                      height: "280px",
                      backgroundColor: "#1c6e5a",
                      color: "#fff",
                      margin: "0 auto",
                      padding: "16px",
                      position: "relative",
                      borderRadius: "6px",
                    }}
                  >
                    <div className="text-center text-uppercase">
                      <h2
                        style={{
                          textTransform: "lowercase",
                          fontSize: "42px",
                          marginBottom: "0",
                        }}
                      >
                        {popup.title || "ambiente"}
                      </h2>
                      <h5 className="fw-bold">{popup.subtitle || "6.-10.2.2026"}</h5>
                      <h5 className="fw-bold">{popup.content || "frankfurt/main"}</h5>
                    </div>
                    <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                      <small className="d-block">{popup.data?.hall || "Hall"}</small>
                      <strong>{popup.data?.stand || "Stand No. --"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Chairman Message */}
      {activeTab === "chairman" && (
        <div className="admin-table-card p-4">
          <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FiUser className="text-primary" /> Chairman's Message & Leadership
          </h4>

          <form onSubmit={handleSaveChairman}>
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Chairman Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={chairman.data?.chairman_name || ""}
                    onChange={(e) =>
                      setChairman((prev) => ({
                        ...prev,
                        data: { ...prev.data, chairman_name: e.target.value },
                      }))
                    }
                    placeholder="Mr. Nader Khan"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Subtitle / Tagline</label>
                  <input
                    type="text"
                    className="form-control"
                    value={chairman.tagline || ""}
                    onChange={(e) =>
                      setChairman((prev) => ({ ...prev, tagline: e.target.value }))
                    }
                    placeholder="Leading with Vision, Passion & Craftsmanship"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Speech / Message Text</label>
                  <textarea
                    rows={6}
                    className="form-control"
                    value={chairman.content || ""}
                    onChange={(e) =>
                      setChairman((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="Chairman message content..."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Upload Portrait Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setChairmanImageFile(file);
                        setChairmanImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary d-inline-flex align-items-center gap-2"
                >
                  <FiSave />
                  {saving ? "Saving..." : "Save Chairman Message"}
                </button>
              </div>

              <div className="col-12 col-md-6">
                <div className="border rounded p-3 bg-light-subtle">
                  <h6 className="fw-bold mb-2">Portrait Image</h6>
                  {chairmanImagePreview || chairman.media_path ? (
                    <img
                      src={
                        chairmanImagePreview ||
                        (chairman.media_path?.startsWith("http")
                          ? chairman.media_path
                          : `${STORAGE_BASE_URL}/${chairman.media_path}`)
                      }
                      alt="Chairman"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "300px" }}
                    />
                  ) : (
                    <div className="p-4 text-center text-muted small">
                      Using default image (t-2.jpg). Upload a photo to update.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SectionsManager;
