import React, { useState, useEffect } from "react";
import Event1 from "../../../assets/images/ambiente.jpg";
import Event5 from "../../../assets/images/ceramics-expo.jpg";
import { api, STORAGE_BASE_URL } from "../../../services/api";
import "../Upcommingevent/Upcommingevent.css";

const fallbackEvents = [
  {
    id: 1,
    title: "International Trade Fair Germany Messe Frankfurt Fair 2026",
    category: "Our Upcomming Event",
    description:
      "We are excited to announce our participation in the prestigious International Trade Fair 2026 at Messe Frankfurt, Germany, continuing our tradition of showcasing excellence. Visit our booth to explore our latest collections, innovative designs, and unparalleled craftsmanship.",
    date_text: "06 - 10 February, 2026",
    stand_no: "Hall Stand No. -- --",
    image: Event1,
  },
  {
    id: 2,
    title: "Join Us at Ceramic Expo Bangladesh 2025!",
    category: "Our Upcomming Event",
    description:
      "We are excited to invite you to Ceramic Expo Bangladesh 2025, the premier event showcasing innovation, craftsmanship, and excellence in the ceramics industry. Visit our booth to explore our latest collections, cutting-edge designs, and high-quality ceramic products.",
    date_text: "November, 2025",
    stand_no: "Pavilion 12",
    image: Event5,
  },
];

function Upcommingevent() {
  const [events, setEvents] = useState(fallbackEvents);

  useEffect(() => {
    let isMounted = true;
    api
      .getEvents()
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;
        const mapped = data.map((ev, index) => ({
          id: ev.id,
          title: ev.title,
          category: ev.category || "Our Upcomming Event",
          description: ev.description,
          date_text: ev.date_text,
          stand_no: ev.stand_no,
          image:
            ev.image_url ||
            (ev.image_path
              ? `${STORAGE_BASE_URL}/${ev.image_path}`
              : index === 0
              ? Event1
              : Event5),
        }));
        setEvents(mapped);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="upcomming-event">
      <div className="row g-0">
        {events.map((ev, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div className="col-sm-12 event-item" key={ev.id}>
              <div className="row g-0">
                <div
                  className={`col-sm-12 col-md-12 col-lg-6 ${
                    isReversed ? "order-lg-2 order-sm-1" : ""
                  }`}
                >
                  <div className="img-wrapper">
                    <img src={ev.image} alt={ev.title} />
                  </div>
                </div>
                <div
                  className={`col-sm-12 col-md-12 col-lg-6 ${
                    isReversed ? "order-lg-1 order-sm-2" : ""
                  }`}
                >
                  <div className="event-des-wraper">
                    <p>{ev.category}</p>
                    <h1>{ev.title}</h1>
                    <p>{ev.description}</p>
                    {ev.date_text && (
                      <>
                        <h6 className="text-color fw-bold mb-0">Save the Date</h6>
                        <h3 className="text-color fw-bold mb-0">{ev.date_text}</h3>
                      </>
                    )}
                    {ev.stand_no && (
                      <h3 className="text-color fw-bold">{ev.stand_no}</h3>
                    )}
                    <p>
                      We warmly invite you to join us and experience something
                      extraordinary. See you there!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Upcommingevent;
