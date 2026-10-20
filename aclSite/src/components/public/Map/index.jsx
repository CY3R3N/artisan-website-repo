import React from "react";

const Map = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.2281438823321!2d90.40044196617765!3d23.85723798466539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c69d709f5761%3A0x2ace286fd5e0bdc!2sArtisan%20Ceramics%20Limited!5e0!3m2!1sen!2sbd!4v1733849830720!5m2!1sen!2sbd"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Artisan Ceramics Location"
    ></iframe>
  );
};

export default Map;
