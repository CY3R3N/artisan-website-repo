import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FiCheckCircle, FiSend, FiFileText } from "react-icons/fi";
import { saveCatalogRequest } from "../../../services/catalogRequestService";
import { api } from "../../../services/api";
import placeholderImg from "../../../assets/images/placeholder.png";
import "./CatalogRequestModal.css";

function CatalogRequestModal({ show, onHide, catalog }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens or closes
  useEffect(() => {
    if (show) {
      setIsSuccess(false);
      setErrors({});
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
    }
  }, [show, catalog]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      catalog_id: catalog?.id,
      catalogId: catalog?.id,
      catalog_name: catalog?.cname || "Artisan Ceramics Product Catalog",
      catalogName: catalog?.cname || "Artisan Ceramics Product Catalog",
      catalogDate: catalog?.cdate || "",
      catalogImg: catalog?.cImg || "",
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      // 1. Submit to Laravel Backend API
      await api.submitCatalogRequest(payload).catch((err) => {
        console.warn("API request stored locally, server notice:", err.message);
      });

      // 2. Also save to local client storage for instant resilience
      saveCatalogRequest(payload);

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="catalog-request-modal"
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          <FiFileText className="text-primary me-2" />
          Request Catalog Access
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        {isSuccess ? (
          <div className="catalog-request-success">
            <FiCheckCircle className="catalog-success-icon" />
            <h4>Thank You for Your Request!</h4>
            <p>
              We have received your request for{" "}
              <strong>{catalog?.cname || "our catalog"}</strong>. Our team will
              review your details and email the catalog to{" "}
              <strong>{formData.email}</strong> shortly.
            </p>
            <button
              type="button"
              className="catalog-modal-submit-btn"
              onClick={onHide}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Catalog Thumbnail & Info Header */}
            <div className="catalog-preview-banner">
              <img
                src={catalog?.cImg || placeholderImg}
                alt={catalog?.cname || "Catalog cover"}
                className="catalog-preview-thumb"
              />
              <div className="catalog-preview-info">
                <h5>{catalog?.cname || "Product Catalog"}</h5>
                <p>Published: {catalog?.cdate || "Latest Edition"}</p>
                <small className="text-muted d-block mt-1">
                  Leave your details below to request digital copy & pricing.
                </small>
              </div>
            </div>

            {/* Request Form */}
            <form onSubmit={handleSubmit} className="catalog-request-form">
              <div className="mb-3">
                <label className="form-label" htmlFor="req-name">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  id="req-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                {errors.name && (
                  <div className="error-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="req-email">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="req-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <div className="error-feedback">{errors.email}</div>
                )}
              </div>

              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label" htmlFor="req-company">
                    Company / Organization
                  </label>
                  <input
                    id="req-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Artisan Design Studio"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label" htmlFor="req-phone">
                    Phone Number
                  </label>
                  <input
                    id="req-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="req-message">
                  Inquiry / Notes (Optional)
                </label>
                <textarea
                  id="req-message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any particular collections, shapes, or export requirements?"
                  className="form-control"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="catalog-modal-submit-btn"
              >
                <FiSend />
                {isSubmitting ? "Submitting Request..." : "Request Catalog"}
              </button>
            </form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default CatalogRequestModal;
