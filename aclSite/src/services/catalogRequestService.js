// Service for managing catalog requests (client-side mock with localStorage, ready for API integration)

const STORAGE_KEY = "acl_catalog_requests";

// Get all catalog requests from localStorage
export const getCatalogRequests = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading catalog requests from storage:", error);
    return [];
  }
};

// Save a new catalog request
export const saveCatalogRequest = (requestData) => {
  try {
    const existing = getCatalogRequests();
    const newRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      createdAt: new Date().toISOString(),
      status: "pending", // "pending" | "sent"
      catalogId: requestData.catalogId || null,
      catalogName: requestData.catalogName || "General Catalog",
      catalogDate: requestData.catalogDate || "",
      catalogImg: requestData.catalogImg || "",
      name: requestData.name ? requestData.name.trim() : "",
      email: requestData.email ? requestData.email.trim() : "",
      company: requestData.company ? requestData.company.trim() : "",
      phone: requestData.phone ? requestData.phone.trim() : "",
      message: requestData.message ? requestData.message.trim() : "",
    };

    const updated = [newRequest, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch event for real-time reactivity across components and tabs
    window.dispatchEvent(
      new CustomEvent("catalogRequestsUpdated", { detail: updated })
    );

    return { success: true, data: newRequest };
  } catch (error) {
    console.error("Error saving catalog request:", error);
    return { success: false, error: error.message };
  }
};

// Update request status (e.g. toggle between 'pending' and 'sent')
export const updateCatalogRequestStatus = (requestId, newStatus) => {
  try {
    const existing = getCatalogRequests();
    const updated = existing.map((req) =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent("catalogRequestsUpdated", { detail: updated })
    );

    return { success: true };
  } catch (error) {
    console.error("Error updating catalog request status:", error);
    return { success: false, error: error.message };
  }
};

// Delete a request by ID
export const deleteCatalogRequest = (requestId) => {
  try {
    const existing = getCatalogRequests();
    const updated = existing.filter((req) => req.id !== requestId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent("catalogRequestsUpdated", { detail: updated })
    );

    return { success: true };
  } catch (error) {
    console.error("Error deleting catalog request:", error);
    return { success: false, error: error.message };
  }
};

// Clear all requests
export const clearAllCatalogRequests = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent("catalogRequestsUpdated", { detail: [] })
    );
    return { success: true };
  } catch (error) {
    console.error("Error clearing catalog requests:", error);
    return { success: false, error: error.message };
  }
};
