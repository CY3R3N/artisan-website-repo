import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiVideo,
  FiFileText,
  FiClock,
  FiCalendar,
  FiAward,
  FiUsers,
  FiBriefcase,
  FiMail,
  FiGlobe,
  FiLayers,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { api } from "../services/api";
import { getCatalogRequests } from "../services/catalogRequestService";
import "../pages/admin/Admin.css";

function AdminLayout() {
  const [pendingCount, setPendingCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: "Admin", email: "admin@artisanceramics.com" });
  const location = useLocation();
  const navigate = useNavigate();

  // Force Light Theme permanently in Admin Panel
  useEffect(() => {
    const previousTheme = document.documentElement.getAttribute("data-theme") || "light";
    document.documentElement.setAttribute("data-theme", "light");

    // Load admin user info if stored
    try {
      const stored = localStorage.getItem("acl_admin_user");
      if (stored) {
        setAdminUser(JSON.parse(stored));
      }
    } catch {}

    return () => {
      // Restore public theme when leaving admin panel
      const saved = localStorage.getItem("theme") || previousTheme;
      document.documentElement.setAttribute("data-theme", saved);
    };
  }, []);

  const updateCount = async () => {
    try {
      const stats = await api.getDashboardStats();
      setPendingCount(stats.catalog_requests_pending || 0);
    } catch {
      const list = getCatalogRequests();
      const pending = list.filter((r) => r.status === "pending").length;
      setPendingCount(pending);
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("catalogRequestsUpdated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("catalogRequestsUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {}
    localStorage.removeItem("acl_admin_token");
    localStorage.removeItem("acl_admin_user");
    navigate("/admin/login", { replace: true });
  };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
    { to: "/admin/sections", label: "Homepage & Videos", icon: FiVideo },
    { to: "/admin/catalogs", label: "Product Catalogs", icon: FiFileText },
    {
      to: "/admin/catalog-requests",
      label: "Catalog Leads",
      icon: FiClock,
      badge: pendingCount,
    },
    { to: "/admin/events", label: "Events & Fairs", icon: FiCalendar },
    { to: "/admin/news", label: "News & Awards", icon: FiAward },
    { to: "/admin/team", label: "Board & Committee", icon: FiUsers },
    { to: "/admin/careers", label: "Careers & Jobs", icon: FiBriefcase },
    { to: "/admin/inquiries", label: "Contact Inbox", icon: FiMail },
  ];

  return (
    <div className="admin-layout-root light-mode-forced">
      {/* Top Navbar */}
      <nav className="admin-navbar sticky-top">
        <div className="container-fluid px-lg-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-link text-white p-0 d-lg-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <FiX className="fs-3" /> : <FiMenu className="fs-3" />}
            </button>

            <Link to="/admin" className="admin-brand">
              <FiLayers className="text-warning fs-4" />
              <span>Artisan Ceramics</span>
              <span className="admin-badge">Admin CMS</span>
            </Link>
          </div>

          {/* Quick links & User Profile on right */}
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/"
              className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
              title="Open public website in new tab"
            >
              <FiGlobe /> <span className="d-none d-sm-inline">Live Website</span>
            </Link>

            <div className="d-flex align-items-center gap-2 border-start border-white border-opacity-25 ps-3">
              <span className="small text-white-50 d-none d-md-inline d-flex align-items-center gap-1">
                <FiUser /> {adminUser?.name || "Admin"}
              </span>
              <button
                type="button"
                className="btn btn-danger btn-sm d-flex align-items-center gap-1 px-2 py-1"
                onClick={handleLogout}
                title="Log Out of Admin Panel"
              >
                <FiLogOut /> <span className="d-none d-sm-inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container with Sidebar + Content */}
      <div className="container-fluid px-0 flex-grow-1 d-flex">
        {/* Sidebar */}
        <aside
          className={`admin-sidebar ${mobileMenuOpen ? "open" : ""}`}
        >
          <div className="admin-sidebar-inner py-3">
            <div className="px-3 mb-2 text-uppercase text-muted fw-bold small">
              Content Management
            </div>

            <nav className="nav flex-column">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `admin-nav-item ${isActive ? "active" : ""}`
                    }
                  >
                    <Icon className="fs-5" />
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="admin-pending-counter ms-auto">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div
            className="admin-sidebar-backdrop d-lg-none"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Content Outlet */}
        <main className="admin-main flex-grow-1">
          <Outlet />
        </main>
      </div>

      {/* Admin Footer */}
      <footer className="py-3 px-4 text-center text-muted border-top border-light-subtle small bg-white">
        © {new Date().getFullYear()} Artisan Ceramics Limited — CMS & Administration Portal
      </footer>
    </div>
  );
}

export default AdminLayout;
