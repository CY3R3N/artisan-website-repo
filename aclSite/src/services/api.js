// Central API Client connecting React Frontend to Laravel Backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORAGE_BASE_URL = import.meta.env.VITE_STORAGE_BASE_URL || "http://127.0.0.1:8000/storage";

export { API_BASE_URL, STORAGE_BASE_URL };

// Helper to make API requests with error handling
async function request(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem("acl_admin_token");
    const headers = {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    // If body is not FormData, set Content-Type JSON
    if (options.body && !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API request to ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const api = {
  // Authentication
  login: (credentials) =>
    request("/login", {
      method: "POST",
      body: credentials,
    }),
  logout: () =>
    request("/logout", {
      method: "POST",
    }).catch(() => {}),
  getUser: () => request("/user"),

  // Ping backend status
  ping: () => request("/ping"),

  // Dashboard Stats
  getDashboardStats: () => request("/dashboard/stats"),

  // Dynamic Site Sections (Hero, Profile, Popup, Chairman, Contact Info)
  getSections: () => request("/sections"),
  getSection: (key) => request(`/sections/${key}`),
  updateSection: (key, formData) =>
    request(`/sections/${key}`, {
      method: "POST",
      body: formData,
    }),

  // Catalogs
  getCatalogs: () => request("/catalogs"),
  getCatalog: (id) => request(`/catalogs/${id}`),
  createCatalog: (formData) =>
    request("/catalogs", {
      method: "POST",
      body: formData,
    }),
  updateCatalog: (id, formData) => {
    // For file uploads in Laravel PUT/PATCH, use POST with _method=PUT or POST endpoint
    if (formData instanceof FormData) {
      formData.append("_method", "PUT");
      return request(`/catalogs/${id}`, {
        method: "POST",
        body: formData,
      });
    }
    return request(`/catalogs/${id}`, {
      method: "PUT",
      body: formData,
    });
  },
  deleteCatalog: (id) =>
    request(`/catalogs/${id}`, {
      method: "DELETE",
    }),

  // Catalog Requests
  getCatalogRequests: () => request("/catalog-requests"),
  submitCatalogRequest: (data) =>
    request("/catalog-requests", {
      method: "POST",
      body: data,
    }),
  updateCatalogRequestStatus: (id, status) =>
    request(`/catalog-requests/${id}`, {
      method: "PUT",
      body: { status },
    }),
  deleteCatalogRequest: (id) =>
    request(`/catalog-requests/${id}`, {
      method: "DELETE",
    }),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ""}`);
  },
  getAdminProducts: () => request("/admin/products"),
  createProduct: (formData) =>
    request("/products", {
      method: "POST",
      body: formData,
    }),
  updateProduct: (id, formData) => {
    if (formData instanceof FormData) {
      formData.append("_method", "PUT");
      return request(`/products/${id}`, {
        method: "POST",
        body: formData,
      });
    }
    return request(`/products/${id}`, {
      method: "PUT",
      body: formData,
    });
  },
  deleteProduct: (id) =>
    request(`/products/${id}`, {
      method: "DELETE",
    }),

  // Upcoming Events
  getEvents: () => request("/events"),
  createEvent: (formData) =>
    request("/events", {
      method: "POST",
      body: formData,
    }),
  updateEvent: (id, formData) => {
    if (formData instanceof FormData) {
      formData.append("_method", "PUT");
      return request(`/events/${id}`, {
        method: "POST",
        body: formData,
      });
    }
    return request(`/events/${id}`, {
      method: "PUT",
      body: formData,
    });
  },
  deleteEvent: (id) =>
    request(`/events/${id}`, {
      method: "DELETE",
    }),

  // News & Articles
  getNews: () => request("/news"),
  createNews: (formData) =>
    request("/news", {
      method: "POST",
      body: formData,
    }),
  updateNews: (id, formData) => {
    if (formData instanceof FormData) {
      formData.append("_method", "PUT");
      return request(`/news/${id}`, {
        method: "POST",
        body: formData,
      });
    }
    return request(`/news/${id}`, {
      method: "PUT",
      body: formData,
    });
  },
  deleteNews: (id) =>
    request(`/news/${id}`, {
      method: "DELETE",
    }),

  // Team & Leadership
  getTeam: (group = "") =>
    request(`/team${group ? `?group=${group}` : ""}`),
  getAdminTeam: () => request("/admin/team"),
  createTeamMember: (formData) =>
    request("/team", {
      method: "POST",
      body: formData,
    }),
  updateTeamMember: (id, formData) => {
    if (formData instanceof FormData) {
      formData.append("_method", "PUT");
      return request(`/team/${id}`, {
        method: "POST",
        body: formData,
      });
    }
    return request(`/team/${id}`, {
      method: "PUT",
      body: formData,
    });
  },
  deleteTeamMember: (id) =>
    request(`/team/${id}`, {
      method: "DELETE",
    }),

  // Careers & Jobs
  getJobs: () => request("/jobs"),
  getAdminJobs: () => request("/admin/jobs"),
  createJob: (data) =>
    request("/jobs", {
      method: "POST",
      body: data,
    }),
  updateJob: (id, data) =>
    request(`/jobs/${id}`, {
      method: "PUT",
      body: data,
    }),
  deleteJob: (id) =>
    request(`/jobs/${id}`, {
      method: "DELETE",
    }),

  // Contact Inquiries
  getInquiries: () => request("/inquiries"),
  submitInquiry: (data) =>
    request("/inquiries", {
      method: "POST",
      body: data,
    }),
  updateInquiryStatus: (id, status) =>
    request(`/inquiries/${id}`, {
      method: "PUT",
      body: { status },
    }),
  deleteInquiry: (id) =>
    request(`/inquiries/${id}`, {
      method: "DELETE",
    }),
};
