import React, { useState, useEffect } from "react";
import {
  FiBriefcase,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiRefreshCw,
} from "react-icons/fi";
import { api } from "../../services/api";

function CareersManager() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    department: "Design & Marketing",
    job_type: "Full Time",
    location: "Head Office",
    salary_range: "Negotiable",
    deadline: "28 Feb, 2025",
    description: "",
    requirements: "",
    is_active: true,
  });
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminJobs();
      setJobs(data);
    } catch {
      setJobs([
        {
          id: 1,
          title: "Creative Graphics Designer",
          department: "Design & Marketing",
          job_type: "Full Time",
          location: "Head Office",
          salary_range: "Negotiable",
          deadline: "28 Feb, 2025",
          is_active: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      department: "Design & Marketing",
      job_type: "Full Time",
      location: "Head Office",
      salary_range: "Negotiable",
      deadline: "30 Days from posting",
      description: "",
      requirements: "",
      is_active: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (job) => {
    setEditingId(job.id);
    setFormData({
      title: job.title,
      department: job.department || "",
      job_type: job.job_type || "Full Time",
      location: job.location || "Head Office",
      salary_range: job.salary_range || "Negotiable",
      deadline: job.deadline || "",
      description: job.description || "",
      requirements: job.requirements || "",
      is_active: job.is_active ?? true,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await api.updateJob(editingId, formData);
        notify("Job posting updated!");
      } else {
        await api.createJob(formData);
        notify("New job vacancy posted to database!");
      }

      setShowModal(false);
      loadJobs();
    } catch (err) {
      alert("Error saving job: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete job opening "${title}"?`)) {
      try {
        await api.deleteJob(id);
        notify("Job posting deleted.");
        loadJobs();
      } catch (err) {
        alert("Failed to delete job: " + err.message);
      }
    }
  };

  return (
    <div className="container-fluid px-lg-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">Career Opportunities & Jobs</h1>
          <p className="admin-header-subtitle">
            Post job openings, specify requirements, and manage vacancies visible on the careers page.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={loadJobs}
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            onClick={handleOpenCreate}
          >
            <FiPlus /> Post New Job
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <FiCheckCircle className="fs-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Jobs Table */}
      <div className="admin-table-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Type</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td>
                    <strong>{j.title}</strong>
                  </td>
                  <td>{j.department}</td>
                  <td>
                    <span className="badge bg-light text-dark">
                      <FiClock className="me-1" /> {j.job_type}
                    </span>
                  </td>
                  <td>
                    <FiMapPin className="text-muted me-1" /> {j.location}
                  </td>
                  <td>
                    <FiDollarSign className="text-muted me-1" /> {j.salary_range}
                  </td>
                  <td>
                    <small className="text-muted">{j.deadline}</small>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        j.is_active ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {j.is_active ? "Open" : "Closed"}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => handleOpenEdit(j)}
                    >
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      type="button"
                      className="admin-action-btn delete"
                      onClick={() => handleDelete(j.id, j.title)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                    {editingId ? "Edit Job Opening" : "Post New Job Opening"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="col-12 col-md-8 mb-3">
                      <label className="form-label fw-bold">Job Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, title: e.target.value }))
                        }
                        placeholder="e.g. Creative Graphics Designer"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                      <label className="form-label fw-bold">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.department}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, department: e.target.value }))
                        }
                        placeholder="e.g. Design & Marketing"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-4 mb-3">
                      <label className="form-label fw-bold">Job Type</label>
                      <select
                        className="form-select"
                        value={formData.job_type}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, job_type: e.target.value }))
                        }
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                      <label className="form-label fw-bold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, location: e.target.value }))
                        }
                        placeholder="e.g. Head Office / Factory"
                      />
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                      <label className="form-label fw-bold">Salary Range</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.salary_range}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, salary_range: e.target.value }))
                        }
                        placeholder="e.g. Negotiable / ৳50k - ৳70k"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Application Deadline</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, deadline: e.target.value }))
                      }
                      placeholder="e.g. 28 Feb, 2025"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Job Description</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, description: e.target.value }))
                      }
                      placeholder="Responsibilities, role overview..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Requirements & Qualifications</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, requirements: e.target.value }))
                      }
                      placeholder="Degrees, tools, years of experience..."
                    />
                  </div>

                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="jobActive"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, is_active: e.target.checked }))
                      }
                    />
                    <label className="form-check-label fw-bold" htmlFor="jobActive">
                      Position Open / Accepting Applications
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
                    {saving ? "Saving..." : "Save Job Opening"}
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

export default CareersManager;
