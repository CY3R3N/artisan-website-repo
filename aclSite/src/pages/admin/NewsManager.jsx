import React, { useState, useEffect } from "react";
import {
  FiAward,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";
import { api, STORAGE_BASE_URL } from "../../services/api";
import placeholderImg from "../../assets/images/placeholder.png";

import NewsImg from "../../assets/images/blog/news.jpg";
import NewsImg2 from "../../assets/images/blog/trophy-18-19.jpg";
import NewsImg3 from "../../assets/images/blog/trophy-21-22.jpg";

const bundledNewsImages = {
  1: NewsImg3,
  2: NewsImg,
  3: NewsImg2,
};

function NewsManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date_text: "",
    excerpt: "",
    content: "",
    is_active: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await api.getNews();
      setArticles(data);
    } catch {
      setArticles([
        {
          id: 1,
          title:
            "Honorable Chairman Mr. Nader Khan Receiving National Export Trophy 2021-2022",
          date_text: "11th July, 2024",
          is_active: true,
        },
        {
          id: 2,
          title:
            "Honorable Chief Executive Officer (CEO) Mr. Mamunur Rashid Receiving National Export Trophy 2020-2021",
          date_text: "8th November, 2023",
          is_active: true,
        },
        {
          id: 3,
          title:
            "Honorable Chief Executive Officer (CEO) Mr. Mamunur Rashid Receiving National Export Trophy 2018-2019",
          date_text: "22th November, 2022",
          is_active: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      date_text: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      excerpt: "",
      content: "",
      is_active: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleOpenEdit = (a) => {
    setEditingId(a.id);
    setFormData({
      title: a.title,
      date_text: a.date_text || a.date || "",
      excerpt: a.excerpt || "",
      content: a.content || "",
      is_active: a.is_active ?? true,
    });
    setImageFile(null);
    setImagePreview(a.image_url || a.img || null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("date_text", formData.date_text);
      form.append("excerpt", formData.excerpt);
      form.append("content", formData.content);
      form.append("is_active", formData.is_active ? 1 : 0);

      if (imageFile) {
        form.append("image", imageFile);
      }

      if (editingId) {
        await api.updateNews(editingId, form);
        notify("Article updated successfully!");
      } else {
        await api.createNews(form);
        notify("News article published and saved to MySQL!");
      }

      setShowModal(false);
      loadNews();
    } catch (err) {
      alert("Error saving news article: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      try {
        await api.deleteNews(id);
        notify("Article deleted.");
        loadNews();
      } catch (err) {
        alert("Failed to delete article: " + err.message);
      }
    }
  };

  const getArticleImage = (a) => {
    if (a.image_url) return a.image_url;
    if (a.img) return a.img;
    if (a.image_path) return `${STORAGE_BASE_URL}/${a.image_path}`;
    if (bundledNewsImages[a.id]) return bundledNewsImages[a.id];
    return placeholderImg;
  };

  return (
    <div className="container-fluid px-lg-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">News, Media & Export Trophies</h1>
          <p className="admin-header-subtitle">
            Publish company news, national awards, certifications, and press releases.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={loadNews}
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            onClick={handleOpenCreate}
          >
            <FiPlus /> Add News / Award
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <FiCheckCircle className="fs-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Articles Grid */}
      <div className="row g-4">
        {articles.map((a) => (
          <div className="col-12 col-md-4" key={a.id}>
            <div className="admin-table-card h-100 d-flex flex-column justify-content-between">
              <div>
                <img
                  src={getArticleImage(a)}
                  alt={a.title}
                  className="w-100 rounded-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = placeholderImg;
                  }}
                />
                <div className="p-3">
                  <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                    <FiCalendar /> {a.date_text || a.date}
                  </div>
                  <h6 className="fw-bold mb-2">{a.title}</h6>
                  {a.excerpt && (
                    <p className="text-muted small mb-0">{a.excerpt}</p>
                  )}
                </div>
              </div>

              <div className="p-3 pt-0 border-top mt-2 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                  onClick={() => handleOpenEdit(a)}
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                  onClick={() => handleDelete(a.id, a.title)}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{ backgroundImage: "none", backgroundColor: "var(--bg-color)" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingId ? "Edit Article" : "Publish News / Award Article"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Headline / Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="e.g. National Export Trophy Award Announcement"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Date Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.date_text}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, date_text: e.target.value }))
                      }
                      placeholder="e.g. 11th July, 2024"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Brief Excerpt</label>
                    <textarea
                      rows={2}
                      className="form-control"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, excerpt: e.target.value }))
                      }
                      placeholder="Short summary displayed on cards..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Full Article Content</label>
                    <textarea
                      rows={5}
                      className="form-control"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, content: e.target.value }))
                      }
                      placeholder="Full details, quotes, press release text..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Featured Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>

                  {imagePreview && (
                    <div className="mb-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxHeight: "160px" }}
                        className="rounded border"
                      />
                    </div>
                  )}

                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="newsActive"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, is_active: e.target.checked }))
                      }
                    />
                    <label className="form-check-label fw-bold" htmlFor="newsActive">
                      Published & Visible
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary btn-sm"
                  >
                    {saving ? "Publishing..." : "Publish Article"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsManager;
