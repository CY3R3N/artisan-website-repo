import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiVideo,
  FiCalendar,
  FiAward,
  FiUsers,
  FiBriefcase,
  FiMail,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiActivity,
  FiRefreshCw,
} from "react-icons/fi";
import { api } from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const ping = await api.ping();
      setServerOnline(ping.status === "online");
      const data = await api.getDashboardStats();
      setStats(data);
    } catch {
      setServerOnline(false);
      // Fallback local stats if server momentarily starting
      setStats({
        catalogs_count: 4,
        catalog_requests_pending: 0,
        catalog_requests_total: 0,
        products_count: 0,
        news_count: 3,
        events_count: 2,
        jobs_count: 1,
        team_count: 6,
        inquiries_new: 0,
        recent_catalog_requests: [],
        recent_inquiries: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const metricCards = [
    {
      title: "Product Catalogs",
      count: stats?.catalogs_count ?? 4,
      icon: FiFileText,
      color: "blue",
      link: "/admin/catalogs",
      action: "Manage Catalogs",
    },
    {
      title: "Catalog Leads",
      count: stats?.catalog_requests_total ?? 0,
      subtext: `${stats?.catalog_requests_pending ?? 0} pending`,
      icon: FiClock,
      color: "yellow",
      link: "/admin/catalog-requests",
      action: "Review Leads",
    },
    {
      title: "Upcoming Events",
      count: stats?.events_count ?? 2,
      icon: FiCalendar,
      color: "green",
      link: "/admin/events",
      action: "Edit Events",
    },
    {
      title: "News & Awards",
      count: stats?.news_count ?? 3,
      icon: FiAward,
      color: "blue",
      link: "/admin/news",
      action: "Manage News",
    },
    {
      title: "Board & Committee",
      count: stats?.team_count ?? 6,
      icon: FiUsers,
      color: "green",
      link: "/admin/team",
      action: "Update Members",
    },
    {
      title: "Job Vacancies",
      count: stats?.jobs_count ?? 1,
      icon: FiBriefcase,
      color: "yellow",
      link: "/admin/careers",
      action: "Manage Jobs",
    },
  ];

  return (
    <div className="container-fluid px-lg-4">
      {/* Top Welcome Bar */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="admin-header-title">Artisan CMS Dashboard</h1>
          <p className="admin-header-subtitle">
            Manage all media, hero videos, product catalogs, events, and text dynamically.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span
            className={`badge d-inline-flex align-items-center gap-1 px-3 py-2 ${
              serverOnline
                ? "bg-success-subtle text-success border border-success-subtle"
                : "bg-warning-subtle text-warning border border-warning-subtle"
            }`}
          >
            <FiActivity />
            {serverOnline ? "Laravel API & Database: Online" : "Local Sync Mode"}
          </span>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={fetchStats}
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "spin" : ""} />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="row g-3 mb-4">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div className="col-12 col-sm-6 col-xl-4" key={i}>
              <div className="admin-metric-card h-100 d-flex flex-column justify-content-between mb-0">
                <div className="d-flex align-items-center gap-3">
                  <div className={`admin-metric-icon ${card.color}`}>
                    <Icon />
                  </div>
                  <div className="admin-metric-info">
                    <h3>{card.count}</h3>
                    <span>{card.title}</span>
                    {card.subtext && (
                      <small className="d-block text-warning fw-semibold">
                        {card.subtext}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-top border-light-subtle d-flex justify-content-between align-items-center">
                  <Link
                    to={card.link}
                    className="text-decoration-none small fw-semibold text-primary d-inline-flex align-items-center gap-1"
                  >
                    {card.action} <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="admin-controls-card mb-4">
        <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
          <FiVideo className="text-primary" /> Dynamic Content Shortcuts
        </h5>
        <div className="row g-2">
          <div className="col-6 col-md-3">
            <Link
              to="/admin/sections"
              className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            >
              <FiVideo /> Hero & Profile Videos
            </Link>
          </div>
          <div className="col-6 col-md-3">
            <Link
              to="/admin/catalogs"
              className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            >
              <FiFileText /> Upload Catalogs
            </Link>
          </div>
          <div className="col-6 col-md-3">
            <Link
              to="/admin/events"
              className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            >
              <FiCalendar /> Edit Events & Fairs
            </Link>
          </div>
          <div className="col-6 col-md-3">
            <Link
              to="/admin/team"
              className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            >
              <FiUsers /> Board & Committee
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity: Catalog Leads & Inquiries */}
      <div className="row g-4">
        {/* Recent Catalog Requests */}
        <div className="col-12 col-lg-6">
          <div className="admin-table-card h-100">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">Recent Catalog Inquiries</h6>
              <Link to="/admin/catalog-requests" className="small text-primary">
                View All
              </Link>
            </div>
            {stats?.recent_catalog_requests?.length > 0 ? (
              <div className="table-responsive">
                <table className="admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Requester</th>
                      <th>Catalog</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_catalog_requests.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <small>
                            {new Date(r.created_at || r.createdAt).toLocaleDateString()}
                          </small>
                        </td>
                        <td>
                          <strong>{r.name}</strong>
                          <div className="small text-muted">{r.email}</div>
                        </td>
                        <td>
                          <small>{r.catalog_name || r.catalogName}</small>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              r.status === "sent" ? "bg-success" : "bg-warning text-dark"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-center text-muted small">
                No recent catalog requests yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="col-12 col-lg-6">
          <div className="admin-table-card h-100">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">Recent Contact Messages</h6>
              <Link to="/admin/inquiries" className="small text-primary">
                View All
              </Link>
            </div>
            {stats?.recent_inquiries?.length > 0 ? (
              <div className="table-responsive">
                <table className="admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Sender</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td>
                          <small>{new Date(inq.created_at).toLocaleDateString()}</small>
                        </td>
                        <td>
                          <strong>{inq.name}</strong>
                          <div className="small text-muted">{inq.email}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {inq.department}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              inq.status === "replied"
                                ? "bg-success"
                                : "bg-info text-dark"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-center text-muted small">
                No recent contact messages yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
