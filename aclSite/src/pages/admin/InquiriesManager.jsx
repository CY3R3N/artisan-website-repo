import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiSearch,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiInbox,
  FiSend,
} from "react-icons/fi";
import { api } from "../../services/api";

function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await api.getInquiries();
      setInquiries(data);
    } catch {
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleToggleStatus = async (inq) => {
    const nextStatus = inq.status === "new" ? "replied" : "new";
    try {
      await api.updateInquiryStatus(inq.id, nextStatus);
      loadInquiries();
    } catch (err) {
      alert("Error updating inquiry status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this inquiry record?")) {
      try {
        await api.deleteInquiry(id);
        loadInquiries();
      } catch (err) {
        alert("Failed to delete inquiry: " + err.message);
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.department &&
        inq.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.message &&
        inq.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid px-lg-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">Contact Inquiries Inbox</h1>
          <p className="admin-header-subtitle">
            Messages and export inquiries sent from the website contact page.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
          onClick={loadInquiries}
          title="Refresh"
        >
          <FiRefreshCw className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      {/* Controls */}
      <div className="admin-controls-card mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <FiSearch />
              </span>
              <input
                type="text"
                className="form-control admin-search-input border-start-0"
                placeholder="Search inquiries by name, email, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <select
              className="form-select admin-search-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Messages ({inquiries.length})</option>
              <option value="new">
                New ({inquiries.filter((i) => i.status === "new").length})
              </option>
              <option value="replied">
                Replied ({inquiries.filter((i) => i.status === "replied").length})
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="admin-table-card">
        {filteredInquiries.length === 0 ? (
          <div className="admin-empty-state">
            <FiInbox className="admin-empty-icon" />
            <h5>No Inquiries Found</h5>
            <p className="text-muted">
              {inquiries.length === 0
                ? "When visitors submit the Contact Us form, their messages will appear here in real time."
                : "No inquiries match your current search."}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Received Date</th>
                  <th>Sender</th>
                  <th>Department</th>
                  <th>Message Preview</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div>{new Date(inq.created_at).toLocaleDateString()}</div>
                      <small className="text-muted">
                        {new Date(inq.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </td>

                    <td>
                      <strong>{inq.name}</strong>
                      <div>
                        <a
                          href={`mailto:${inq.email}?subject=Artisan%20Ceramics%20Inquiry%20Response`}
                          className="text-decoration-none text-primary d-inline-flex align-items-center gap-1 small"
                        >
                          <FiMail /> {inq.email}
                        </a>
                      </div>
                    </td>

                    <td>
                      <span className="badge bg-light text-dark">
                        {inq.department || "General"}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 text-start text-truncate d-inline-block text-decoration-none"
                        style={{ maxWidth: "250px" }}
                        onClick={() => setSelectedMessage(inq)}
                        title="Click to view full message"
                      >
                        {inq.message}
                      </button>
                    </td>

                    <td>
                      <span
                        className={`admin-status-badge ${
                          inq.status === "replied" ? "sent" : "pending"
                        }`}
                        onClick={() => handleToggleStatus(inq)}
                        title="Click to toggle status"
                      >
                        {inq.status === "replied" ? (
                          <>
                            <FiCheckCircle /> Replied
                          </>
                        ) : (
                          <>
                            <FiClock /> New
                          </>
                        )}
                      </span>
                    </td>

                    <td className="text-end">
                      <a
                        href={`mailto:${inq.email}?subject=Artisan%20Ceramics%20Response`}
                        className="btn btn-outline-primary btn-sm me-1"
                        title="Reply via Email"
                      >
                        <FiSend />
                      </a>
                      <button
                        type="button"
                        className="admin-action-btn delete"
                        onClick={() => handleDelete(inq.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Message Modal */}
      {selectedMessage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{ backgroundImage: "none", backgroundColor: "var(--bg-color)" }}
            >
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  Inquiry from {selectedMessage.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMessage(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Email:</strong> {selectedMessage.email}
                </p>
                <p>
                  <strong>Department:</strong> {selectedMessage.department}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
                <hr />
                <h6 className="fw-bold">Message:</h6>
                <p className="text-break bg-light p-3 rounded">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="modal-footer">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Artisan%20Ceramics%20Response`}
                  className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                >
                  <FiSend /> Reply to {selectedMessage.email}
                </a>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InquiriesManager;
