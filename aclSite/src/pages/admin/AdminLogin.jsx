import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FiLayers,
  FiLock,
  FiUser,
  FiArrowRight,
  FiAlertCircle,
  FiGlobe,
  FiKey,
} from "react-icons/fi";
import { api } from "../../services/api";

function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  // Force light mode on login page
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.login({ username, password });
      if (res && res.token) {
        localStorage.setItem("acl_admin_token", res.token);
        localStorage.setItem("acl_admin_user", JSON.stringify(res.user || { name: "Admin" }));
        navigate(from, { replace: true });
        return;
      }
      throw new Error("No token returned by server.");
    } catch (err) {
      // Local fallback check if API server is restarting
      if (
        (username === "admin" || username === "admin@artisanceramics.com") &&
        password === "admin12345"
      ) {
        localStorage.setItem("acl_admin_token", "local_session_" + Date.now());
        localStorage.setItem(
          "acl_admin_user",
          JSON.stringify({ name: "Admin", email: "admin@artisanceramics.com" })
        );
        navigate(from, { replace: true });
        return;
      }
      setError(
        err.message || "Invalid username or password. Please verify your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setUsername("admin");
    setPassword("admin12345");
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 8, 119, 0.08)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            backgroundColor: "#000877",
            color: "#ffffff",
            padding: "2rem 1.75rem",
            textAlign: "center",
          }}
        >
          <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle bg-white bg-opacity-10 mb-3">
            <FiLayers className="fs-1 text-warning" />
          </div>
          <h4 className="fw-bold mb-1">Artisan Ceramics</h4>
          <span className="badge bg-warning text-dark px-3 py-1 text-uppercase fw-bold">
            CMS Portal Login
          </span>
        </div>

        {/* Form Body */}
        <div style={{ padding: "2rem 1.75rem" }}>
          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 py-2 small">
              <FiAlertCircle className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-bold small text-muted">
                Username or Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FiUser />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-muted">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FiLock />
                </span>
                <input
                  type="password"
                  className="form-control border-start-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              style={{
                backgroundColor: "#000877",
                borderColor: "#000877",
                borderRadius: "8px",
              }}
            >
              {loading ? "Verifying..." : "Sign In to Admin Panel"}
              <FiArrowRight />
            </button>
          </form>

          {/* Credentials Info Box */}
          <div
            className="mt-4 p-3 rounded"
            style={{
              backgroundColor: "#f8fafc",
              border: "1px dashed #cbd5e1",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <strong className="small text-dark d-flex align-items-center gap-1">
                <FiKey className="text-warning" /> Administrator Credentials:
              </strong>
              <button
                type="button"
                className="btn btn-link p-0 small text-decoration-none"
                onClick={handleFillCredentials}
                style={{ fontSize: "0.78rem" }}
              >
                Auto-fill
              </button>
            </div>
            <div className="small text-muted font-monospace">
              Username: <strong className="text-dark">admin</strong>
            </div>
            <div className="small text-muted font-monospace">
              Password: <strong className="text-dark">admin12345</strong>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-decoration-none small text-muted d-inline-flex align-items-center gap-1"
            >
              <FiGlobe /> Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
