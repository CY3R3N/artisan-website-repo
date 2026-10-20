import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiDownload,
  FiTrash2,
  FiMail,
  FiExternalLink,
  FiInbox,
  FiRefreshCw,
} from "react-icons/fi";
import {
  getCatalogRequests,
  updateCatalogRequestStatus,
  deleteCatalogRequest,
  clearAllCatalogRequests,
} from "../../services/catalogRequestService";
import placeholderImg from "../../assets/images/placeholder.png";

function CatalogRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Load requests
  const loadRequests = () => {
    setRequests(getCatalogRequests());
  };

  useEffect(() => {
    loadRequests();

    // Listen for changes from visitor interactions
    const handleUpdate = () => loadRequests();
    window.addEventListener("catalogRequestsUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("catalogRequestsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleToggleStatus = (req) => {
    const nextStatus = req.status === "sent" ? "pending" : "sent";
    updateCatalogRequestStatus(req.id, nextStatus);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request record?")) {
      deleteCatalogRequest(id);
    }
  };

  const handleClearAll = () => {
    if (
      requests.length > 0 &&
      window.confirm("Are you sure you want to clear ALL catalog request records?")
    ) {
      clearAllCatalogRequests();
    }
  };

  // CSV Export helper
  const handleExportCSV = () => {
    if (requests.length === 0) {
      alert("No requests available to export.");
      return;
    }

    const headers = [
      "ID",
      "Date",
      "Catalog Name",
      "Full Name",
      "Email Address",
      "Company",
      "Phone",
      "Status",
      "Message",
    ];

    const rows = requests.map((r) => [
      `"${r.id}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
      `"${(r.catalogName || "").replace(/"/g, '""')}"`,
      `"${(r.name || "").replace(/"/g, '""')}"`,
      `"${(r.email || "").replace(/"/g, '""')}"`,
      `"${(r.company || "").replace(/"/g, '""')}"`,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${r.status || "pending"}"`,
      `"${(r.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Artisan_Catalog_Requests_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.company &&
        req.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (req.catalogName &&
        req.catalogName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const sentCount = requests.filter((r) => r.status === "sent").length;

  return (
    <div className="container">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">Catalog Requests</h1>
          <p className="admin-header-subtitle">
            View, track, and fulfill catalog inquiries submitted by website visitors.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={loadRequests}
            title="Refresh requests"
          >
            <FiRefreshCw /> Refresh
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            onClick={handleExportCSV}
            disabled={requests.length === 0}
          >
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="row mb-4">
        <div className="col-12 col-md-4">
          <div className="admin-metric-card">
            <div className="admin-metric-icon blue">
              <FiUsers />
            </div>
            <div className="admin-metric-info">
              <h3>{totalCount}</h3>
              <span>Total Inquiries</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="admin-metric-card">
            <div className="admin-metric-icon yellow">
              <FiClock />
            </div>
            <div className="admin-metric-info">
              <h3>{pendingCount}</h3>
              <span>Pending Fulfillment</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="admin-metric-card">
            <div className="admin-metric-icon green">
              <FiCheckCircle />
            </div>
            <div className="admin-metric-info">
              <h3>{sentCount}</h3>
              <span>Catalogs Sent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="admin-controls-card">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <FiSearch />
              </span>
              <input
                type="text"
                className="form-control admin-search-input border-start-0"
                placeholder="Search by visitor name, email, company, or catalog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-4">
            <select
              className="form-select admin-search-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses ({totalCount})</option>
              <option value="pending">Pending Only ({pendingCount})</option>
              <option value="sent">Sent / Completed ({sentCount})</option>
            </select>
          </div>

          <div className="col-6 col-md-2 text-end">
            {requests.length > 0 && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="admin-table-card">
        {filteredRequests.length === 0 ? (
          <div className="admin-empty-state">
            <FiInbox className="admin-empty-icon" />
            <h5>No Catalog Requests Found</h5>
            <p>
              {requests.length === 0
                ? "When visitors request a product catalog on the main site, their name, email, and details will appear here."
                : "No requests match your current search or filter."}
            </p>
            <Link to="/catalog" className="btn btn-outline-primary btn-sm mt-2">
              Visit Public Catalog Page
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Requested Date</th>
                  <th>Catalog</th>
                  <th>Visitor Name</th>
                  <th>Email & Contact</th>
                  <th>Company</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <div>{new Date(req.createdAt).toLocaleDateString()}</div>
                      <small className="text-muted">
                        {new Date(req.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </td>

                    <td>
                      <div className="admin-catalog-cell">
                        <img
                          src={req.catalogImg || placeholderImg}
                          alt={req.catalogName}
                          className="admin-catalog-thumb"
                          onError={(e) => {
                            e.currentTarget.src = placeholderImg;
                          }}
                        />
                        <div>
                          <strong>{req.catalogName}</strong>
                          {req.catalogDate && (
                            <div className="small text-muted">
                              {req.catalogDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong>{req.name}</strong>
                    </td>

                    <td>
                      <div>
                        <a
                          href={`mailto:${req.email}?subject=Artisan%20Ceramics%20Catalog%20Request%20-%20${encodeURIComponent(
                            req.catalogName || "Product Catalog"
                          )}`}
                          className="text-decoration-none text-primary d-inline-flex align-items-center gap-1"
                          title="Send Email"
                        >
                          <FiMail /> {req.email}
                        </a>
                      </div>
                      {req.phone && (
                        <small className="text-muted d-block">{req.phone}</small>
                      )}
                    </td>

                    <td>
                      {req.company ? (
                        <span>{req.company}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>

                    <td>
                      {req.message ? (
                        <button
                          type="button"
                          className="btn btn-link btn-sm p-0 text-start text-truncate d-inline-block"
                          style={{ maxWidth: "160px" }}
                          onClick={() => setSelectedMessage(req)}
                          title="Click to read full message"
                        >
                          {req.message}
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>

                    <td>
                      <span
                        className={`admin-status-badge ${
                          req.status === "sent" ? "sent" : "pending"
                        }`}
                        onClick={() => handleToggleStatus(req)}
                        title="Click to toggle status"
                      >
                        {req.status === "sent" ? (
                          <>
                            <FiCheckCircle /> Sent
                          </>
                        ) : (
                          <>
                            <FiClock /> Pending
                          </>
                        )}
                      </span>
                    </td>

                    <td className="text-end">
                      <button
                        type="button"
                        className="admin-action-btn"
                        onClick={() => handleToggleStatus(req)}
                        title={
                          req.status === "sent"
                            ? "Mark as Pending"
                            : "Mark as Sent"
                        }
                      >
                        {req.status === "sent" ? "Undo" : "Mark Sent"}
                      </button>

                      <button
                        type="button"
                        className="admin-action-btn delete"
                        onClick={() => handleDelete(req.id)}
                        title="Delete Request"
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

      {/* Message Modal Preview */}
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
            <div className="modal-content" style={{ backgroundImage: "none" }}>
              <div className="modal-header">
                <h5 className="modal-title">
                  Message from {selectedMessage.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMessage(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Catalog:</strong> {selectedMessage.catalogName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedMessage.email}
                </p>
                {selectedMessage.company && (
                  <p>
                    <strong>Company:</strong> {selectedMessage.company}
                  </p>
                )}
                <hr />
                <p className="mb-0 text-break">{selectedMessage.message}</p>
              </div>
              <div className="modal-footer">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Artisan%20Ceramics%20Catalog`}
                  className="btn btn-primary btn-sm"
                >
                  <FiMail className="me-1" /> Reply via Email
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

export default CatalogRequests;
