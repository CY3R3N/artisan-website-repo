import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiEye,
  FiRefreshCw,
} from "react-icons/fi";
import { api, STORAGE_BASE_URL } from "../../services/api";
import placeholderImg from "../../assets/images/placeholder.png";

// Bundled images fallback map
import Cat23 from "../../assets/images/catalog/acl-catalog-23.jpg";
import Cat17 from "../../assets/images/catalog/acl-catalog-17.jpg";
import Cat16 from "../../assets/images/catalog/acl-catalog-16.jpg";
import Cat15 from "../../assets/images/catalog/acl-catalog-15.jpg";

const bundledImages = {
  "Product Catalog 2023": Cat23,
  "Product Catalog 2017": Cat17,
  "Product Catalog 2016": Cat16,
  "Product Catalog 2015": Cat15,
};

function CatalogManager() {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date_text: "",
    year: new Date().getFullYear(),
    is_active: true,
  });
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const loadCatalogs = async () => {
    setLoading(true);
    try {
      const data = await api.getCatalogs();
      setCatalogs(data);
    } catch {
      // Fallback local list
      setCatalogs([
        {
          id: 1,
          title: "Product Catalog 2023",
          date_text: "January, 2023",
          year: 2023,
          is_active: true,
        },
        {
          id: 2,
          title: "Product Catalog 2017",
          date_text: "February, 2017",
          year: 2017,
          is_active: true,
        },
        {
          id: 3,
          title: "Product Catalog 2016",
          date_text: "January, 2016",
          year: 2016,
          is_active: true,
        },
        {
          id: 4,
          title: "Product Catalog 2015",
          date_text: "February, 2015",
          year: 2015,
          is_active: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogs();
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      date_text: "",
      year: new Date().getFullYear(),
      is_active: true,
    });
    setThumbFile(null);
    setThumbPreview(null);
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({
      title: cat.title,
      date_text: cat.date_text || cat.cdate || "",
      year: cat.year || new Date().getFullYear(),
      is_active: cat.is_active ?? true,
    });
    setThumbFile(null);
    setThumbPreview(cat.thumbnail_url || cat.cImg || null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("date_text", formData.date_text);
      form.append("year", formData.year);
      form.append("is_active", formData.is_active ? 1 : 0);

      if (thumbFile) {
        form.append("thumbnail", thumbFile);
      }

      if (editingId) {
        await api.updateCatalog(editingId, form);
        notify("Catalog updated successfully!");
      } else {
        await api.createCatalog(form);
        notify("New catalog uploaded and added to database!");
      }

      setShowModal(false);
      loadCatalogs();
    } catch (err) {
      alert("Error saving catalog: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.deleteCatalog(id);
        notify("Catalog deleted.");
        loadCatalogs();
      } catch (err) {
        alert("Failed to delete catalog: " + err.message);
      }
    }
  };

  const getThumbnailSrc = (cat) => {
    if (cat.thumbnail_url) return cat.thumbnail_url;
    if (cat.cImg) return cat.cImg;
    if (cat.thumbnail_path) return `${STORAGE_BASE_URL}/${cat.thumbnail_path}`;
    if (bundledImages[cat.title]) return bundledImages[cat.title];
    return placeholderImg;
  };

  return (
    <div className="container-fluid px-lg-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">Product Catalogs</h1>
          <p className="admin-header-subtitle">
            Upload new catalog covers, manage titles, and control visibility on the website.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={loadCatalogs}
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            onClick={handleOpenCreate}
          >
            <FiPlus /> Add New Catalog
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <FiCheckCircle className="fs-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Catalog Grid */}
      <div className="row g-4">
        {catalogs.map((cat) => (
          <div className="col-12 col-sm-6 col-lg-3" key={cat.id}>
            <div className="admin-table-card h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  style={{
                    height: "260px",
                    overflow: "hidden",
                    backgroundColor: "#f4f6f8",
                  }}
                >
                  <img
                    src={getThumbnailSrc(cat)}
                    alt={cat.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src = placeholderImg;
                    }}
                  />
                </div>
                <div className="p-3">
                  <h5 className="fw-bold mb-1 text-truncate">{cat.title}</h5>
                  <div className="text-muted small mb-2">
                    {cat.date_text || cat.cdate || "Latest edition"}
                  </div>
                  <span
                    className={`badge ${
                      cat.is_active ? "bg-success-subtle text-success" : "bg-secondary"
                    }`}
                  >
                    {cat.is_active ? "Live on Site" : "Hidden"}
                  </span>
                </div>
              </div>

              <div className="p-3 pt-0 border-top mt-2 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                  onClick={() => handleOpenEdit(cat)}
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                  onClick={() => handleDelete(cat.id, cat.title)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit Catalog */}
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
                    {editingId ? "Edit Catalog" : "Add New Product Catalog"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Catalog Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="e.g. Product Catalog 2025"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-bold">Publication Month/Date</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.date_text}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, date_text: e.target.value }))
                        }
                        placeholder="e.g. March, 2025"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-bold">Year</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, year: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Cover Thumbnail Image</label>
                    <div className="border border-2 border-dashed rounded p-3 text-center">
                      <FiUploadCloud className="fs-2 text-primary mb-1" />
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setThumbFile(file);
                            setThumbPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <small className="text-muted d-block mt-1">
                        High resolution JPG or PNG cover image.
                      </small>
                    </div>
                  </div>

                  {thumbPreview && (
                    <div className="mb-3 text-center">
                      <small className="text-muted d-block mb-1">
                        Selected Image Preview:
                      </small>
                      <img
                        src={thumbPreview}
                        alt="Preview"
                        style={{ maxHeight: "160px" }}
                        className="rounded border"
                      />
                    </div>
                  )}

                  <div className="form-check form-switch mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="catActive"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, is_active: e.target.checked }))
                      }
                    />
                    <label className="form-check-label fw-bold" htmlFor="catActive">
                      Make Visible on Public Site
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
                    {saving ? "Saving to Database..." : "Save Catalog"}
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

export default CatalogManager;
