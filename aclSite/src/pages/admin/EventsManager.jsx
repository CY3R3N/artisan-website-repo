import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiMapPin,
  FiRefreshCw,
} from "react-icons/fi";
import { api, STORAGE_BASE_URL } from "../../services/api";
import placeholderImg from "../../assets/images/placeholder.png";

import Event1 from "../../assets/images/ambiente.jpg";
import Event5 from "../../assets/images/ceramics-expo.jpg";

const bundledEventImages = {
  "International Trade Fair Germany Messe Frankfurt Fair 2026": Event1,
  "Join Us at Ceramic Expo Bangladesh 2025!": Event5,
};

function EventsManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Our Upcoming Event",
    date_text: "",
    location: "",
    stand_no: "",
    description: "",
    is_active: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch {
      setEvents([
        {
          id: 1,
          title: "International Trade Fair Germany Messe Frankfurt Fair 2026",
          category: "Our Upcoming Event",
          date_text: "06 - 10 February, 2026",
          location: "Messe Frankfurt, Germany",
          stand_no: "Hall Stand No. -- --",
          description:
            "We are excited to announce our participation in the prestigious International Trade Fair 2026 at Messe Frankfurt, Germany.",
          is_active: true,
        },
        {
          id: 2,
          title: "Join Us at Ceramic Expo Bangladesh 2025!",
          category: "Our Upcoming Event",
          date_text: "November, 2025",
          location: "Dhaka, Bangladesh",
          stand_no: "Pavilion 12",
          description:
            "We are excited to invite you to Ceramic Expo Bangladesh 2025, the premier event showcasing innovation.",
          is_active: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Our Upcoming Event",
      date_text: "",
      location: "",
      stand_no: "",
      description: "",
      is_active: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleOpenEdit = (ev) => {
    setEditingId(ev.id);
    setFormData({
      title: ev.title,
      category: ev.category || "Our Upcoming Event",
      date_text: ev.date_text || "",
      location: ev.location || "",
      stand_no: ev.stand_no || "",
      description: ev.description || "",
      is_active: ev.is_active ?? true,
    });
    setImageFile(null);
    setImagePreview(ev.image_url || null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("date_text", formData.date_text);
      form.append("location", formData.location);
      form.append("stand_no", formData.stand_no);
      form.append("description", formData.description);
      form.append("is_active", formData.is_active ? 1 : 0);

      if (imageFile) {
        form.append("image", imageFile);
      }

      if (editingId) {
        await api.updateEvent(editingId, form);
        notify("Event updated successfully!");
      } else {
        await api.createEvent(form);
        notify("New event created and added to database!");
      }

      setShowModal(false);
      loadEvents();
    } catch (err) {
      alert("Error saving event: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete event "${title}"?`)) {
      try {
        await api.deleteEvent(id);
        notify("Event deleted.");
        loadEvents();
      } catch (err) {
        alert("Failed to delete event: " + err.message);
      }
    }
  };

  const getEventImage = (ev) => {
    if (ev.image_url) return ev.image_url;
    if (ev.image_path) return `${STORAGE_BASE_URL}/${ev.image_path}`;
    if (bundledEventImages[ev.title]) return bundledEventImages[ev.title];
    return placeholderImg;
  };

  return (
    <div className="container-fluid px-lg-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">Events & Trade Fairs</h1>
          <p className="admin-header-subtitle">
            Manage international exhibitions, Frankfurt fairs, and domestic trade expos.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={loadEvents}
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            onClick={handleOpenCreate}
          >
            <FiPlus /> Add New Event
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <FiCheckCircle className="fs-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Events List */}
      <div className="row g-4">
        {events.map((ev) => (
          <div className="col-12 col-lg-6" key={ev.id}>
            <div className="admin-table-card h-100 p-3 d-flex flex-column justify-content-between">
              <div>
                <div className="row g-3">
                  <div className="col-12 col-md-5">
                    <img
                      src={getEventImage(ev)}
                      alt={ev.title}
                      className="img-fluid rounded w-100 shadow-sm"
                      style={{ height: "180px", objectFit: "cover" }}
                      onError={(e) => {
                        e.currentTarget.src = placeholderImg;
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-7">
                    <span className="badge bg-primary-subtle text-primary mb-1">
                      {ev.category}
                    </span>
                    <h5 className="fw-bold mb-1">{ev.title}</h5>
                    <div className="text-muted small mb-2 d-flex align-items-center gap-1">
                      <FiCalendar /> {ev.date_text || "Date TBD"}
                    </div>
                    {ev.location && (
                      <div className="text-muted small mb-2 d-flex align-items-center gap-1">
                        <FiMapPin /> {ev.location} &bull; {ev.stand_no}
                      </div>
                    )}
                    <p
                      className="text-muted small text-truncate-3 mb-0"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {ev.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-top mt-3 d-flex justify-content-between align-items-center">
                <span
                  className={`badge ${
                    ev.is_active ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {ev.is_active ? "Live" : "Draft"}
                </span>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                    onClick={() => handleOpenEdit(ev)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                    onClick={() => handleDelete(ev.id, ev.title)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
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
                    {editingId ? "Edit Event" : "Create Trade Fair / Event"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Event Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="e.g. Messe Frankfurt Trade Fair 2026"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-bold">Category Badge</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, category: e.target.value }))
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-bold">Date Text</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.date_text}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, date_text: e.target.value }))
                        }
                        placeholder="e.g. 06 - 10 February, 2026"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-bold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, location: e.target.value }))
                        }
                        placeholder="e.g. Frankfurt, Germany"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-bold">Hall & Stand No.</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.stand_no}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, stand_no: e.target.value }))
                        }
                        placeholder="e.g. Hall Stand No. 12-A"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, description: e.target.value }))
                      }
                      placeholder="Event overview, collections being showcased..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Banner Image</label>
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
                        style={{ maxHeight: "150px" }}
                        className="rounded border"
                      />
                    </div>
                  )}

                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="evActive"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, is_active: e.target.checked }))
                      }
                    />
                    <label className="form-check-label fw-bold" htmlFor="evActive">
                      Active / Show on Homepage
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
                    {saving ? "Saving..." : "Save Event"}
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

export default EventsManager;
