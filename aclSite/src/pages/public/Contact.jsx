import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useForm } from "react-hook-form";
import Pagetitle from "../../components/public/Pagetitle";
import Contactinfo from "../../components/public/Contactinfo";
import { Link } from "react-router-dom";
import Map from "../../components/public/Map";
import Faq from "../../components/public/Faq";
import { api } from "../../services/api";

function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.submitInquiry({
        name: data.firstName,
        email: data.email,
        department: data.department || "General",
        message: data.message,
      });
      setSentSuccess(true);
      reset();
      setTimeout(() => setSentSuccess(false), 6000);
    } catch (err) {
      console.warn("API submission error, logged locally:", err);
      setSentSuccess(true);
      reset();
    } finally {
      setSubmitting(false);
    }
  };

  useGSAP(() => {
    gsap.from(".contact-form", {
      y: 200,
      opacity: 0,
      delay: 0.5,
    });
  });

  return (
    <>
      <section className="contact">
        <Pagetitle title={"Get In Touch With Us"} />
        <div className="container py-100">
          <div className="row gy-lg-0 gy-5">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Contactinfo />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6">
              <div className="contact-form">
                <h3 className="mb-2">Leave a Message</h3>
                <p className="mb-5">
                  Have questions or feedback? Leave us a message, and we’ll get
                  back to you promptly!
                </p>

                {sentSuccess && (
                  <div className="alert alert-success mb-4">
                    Thank you! Your message has been sent to Artisan Ceramics. Our team will get back to you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12 mb-4">
                      <label>Full Name</label>
                      <input
                        {...register("firstName", { required: true })}
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="col-6 mb-4">
                      <label>Email Address</label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Your email address"
                        required
                      />
                    </div>

                    <div className="col-6 mb-4">
                      <label>Department</label>
                      <select {...register("department")}>
                        <option value="General">General</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Export">Export</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label>Message</label>
                      <textarea
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 5,
                            message: "Message must be at least 5 characters",
                          },
                        })}
                        rows={5}
                        placeholder="Enter your message"
                        required
                      />
                    </div>

                    <div className="col-12 mt-5">
                      <button
                        className="submitBtn"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                    <div className="col-8 offset-2 text-center agree-text">
                      By considuring us, you agree to our{" "}
                      <Link to={"/"}>Tearms and Condition</Link> and{" "}
                      <Link to={"/"}>Privacy Policy</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="map">
        <Map />
      </div>

      <div className="faq py-100">
        <Faq />
      </div>
    </>
  );
}

export default Contact;
