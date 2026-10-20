import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { api, STORAGE_BASE_URL } from "../../services/api";
import placeholderImg from "../../assets/images/placeholder.png";

import t1 from "../../assets/images/t-1.jpg";
import t2 from "../../assets/images/t-2.jpg";
import t3 from "../../assets/images/t-3.jpg";
import t4 from "../../assets/images/t-4.jpg";
import t5 from "../../assets/images/t-5.jpg";
import t6 from "../../assets/images/t-6.jpg";

const bundledTeamImages = {
  "Mr. Nader Khan": t2,
  "Mr. Mamunur Rashid": t1,
  "Mrs. Nazneen Khan": t3,
  "Mr. Tanveer Khan": t4,
  "Barrister Sarah Khan": t5,
  "Mr. Zaheed Khan": t6,
};

function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    group: "director",
    bio: "",
    is_active: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const loadTeam = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminTeam();
      setMembers(data);
    } catch {
      setMembers([
        {
          id: 1,
          name: "Mr. Nader Khan",
          designation: "Chairman",
          group: "director",
          is_active: true,
        },
        {
          id: 2,
          name: "Mr. Mamunur Rashid",
          designation: "Managing Director & CEO",
          group: "director",
          is_active: true,
        },
        {
          id: 3,
          name: "Mrs. Nazneen Khan",
          designation: "Director",
          group: "director",
          is_active: true,
        },
        {
          id: 4,
          name: "Mr. Tanveer Khan",
          designation: "Director",
          group: "director",
          is_active: true,
        },
        {
          id: 5,
          name: "Barrister Sarah Khan",
          designation: "Director",
          group: "director",
          is_active: true,
        },
        {
          id: 6,
          name: "Mr. Zaheed Khan",
          designation: "Director",
          group: "director",
          is_active: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      designation: "",
      group: "director",
      bio: "",
      is_active: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleOpenEdit = (m) => {
    setEditingId(m.id);
    setFormData({
      name: m.name,
      designation: m.designation,
      group: m.group || "director",
      bio: m.bio || "",
      is_active: m.is_active ?? true,
    });
    setImageFile(null);
    setImagePreview(m.image_url || null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("designation", formData.designation);
      form.append("group", formData.group);
      form.append("bio", formData.bio);
      form.append("is_active", formData.is_active ? 1 : 0);

      if (imageFile) {
        form.append("image", imageFile);
      }

      if (editingId) {
        await api.updateTeamMember(editingId, form);
        notify("Member updated successfully!");
      } else {
        await api.createTeamMember(form);
        notify("New member added to database!");
      }

      setShowModal(false);
      loadTeam();
    } catch (err) {
      alert("Error saving member: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete member "${name}"?`)) {
      try {
        await api.deleteTeamMember(id);
        notify("Member removed.");
        loadTeam();
      } catch (err) {
        alert("Failed to delete member: " + err.message);
      }
    }
  };

  const getMemberImage = (m) => {
    if (m.image_url) return m.image_url;
    if (m.image_path) return `${STORAGE_BASE_URL}/${m.image_path}`;
    if (bundledTeamImages[m.name]) return bundledTeamImages[m.name];
    return placeholderImg;
  };

  const filteredMembers = members.filter((m) =>
    activeGroup === "all" ? true : m.group === activeGroup
  );

  return (
    <div className="container-fluid px-lg-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">Board of Directors & Leadership</h1>
          <p className="admin-header-subtitle">
            Manage directors, executives, management committee members, and their bios.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={loadTeam}
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            onClick={handleOpenCreate}
          >
            <FiPlus /> Add Member
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <FiCheckCircle className="fs-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Group Filter Tabs */}
      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeGroup === "all" ? "active" : ""}`}
            onClick={() => setActiveGroup("all")}
          >
            All Members ({members.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeGroup === "director" ? "active" : ""}`}
            onClick={() => setActiveGroup("director")}
          >
            Board of Directors
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeGroup === "executive" ? "active" : ""}`}
            onClick={() => setActiveGroup("executive")}
          >
            Executive Committee
          </button>
        </li>
      </ul>

      {/* Team Grid */}
      <div className="row g-4">
        {filteredMembers.map((m) => (
          <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={m.id}>
            <div className="admin-table-card h-100 text-center p-3 d-flex flex-column justify-content-between">
              <div>
                <img
                  src={getMemberImage(m)}
                  alt={m.name}
                  className="rounded-circle mb-3 mx-auto shadow-sm"
                  style={{ width: "130px", height: "130px", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = placeholderImg;
                  }}
                />
                <h6 className="fw-bold mb-1">{m.name}</h6>
                <div className="text-muted small mb-2">{m.designation}</div>
                <span className="badge bg-light text-dark text-capitalize mb-2">
                  {m.group}
                </span>
              </div>

              <div className="pt-2 border-top mt-2 d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleOpenEdit(m)}
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(m.id, m.name)}
                >
                  <FiTrash2 />
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
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{ backgroundImage: "none", backgroundColor: "var(--bg-color)" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingId ? "Edit Member" : "Add Leadership Member"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="e.g. Mr. Nader Khan"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Designation *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, designation: e.target.value }))
                      }
                      placeholder="e.g. Chairman / Managing Director"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Committee Group</label>
                    <select
                      className="form-select"
                      value={formData.group}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, group: e.target.value }))
                      }
                    >
                      <option value="director">Board of Directors</option>
                      <option value="executive">Executive Committee</option>
                      <option value="management">Senior Management</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Portrait Photo</label>
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
                    <div className="mb-3 text-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        className="rounded-circle border"
                      />
                    </div>
                  )}

                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="tmActive"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, is_active: e.target.checked }))
                      }
                    />
                    <label className="form-check-label fw-bold" htmlFor="tmActive">
                      Active Member
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
                    {saving ? "Saving..." : "Save Member"}
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

export default TeamManager;
