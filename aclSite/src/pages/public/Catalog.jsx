import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Pagetitle from "../../components/public/Pagetitle";
import Catalogcard from "../../components/public/Catalogcard";
import CatalogRequestModal from "../../components/public/CatalogRequestModal";
import { api, STORAGE_BASE_URL } from "../../services/api";

import Cat23 from "../../assets/images/catalog/acl-catalog-23.jpg";
import Cat17 from "../../assets/images/catalog/acl-catalog-17.jpg";
import Cat16 from "../../assets/images/catalog/acl-catalog-16.jpg";
import Cat15 from "../../assets/images/catalog/acl-catalog-15.jpg";
import CatPlaceholder from "../../assets/images/placeholder.png";

const bundledImages = {
  "Product Catalog 2023": Cat23,
  "Product Catalog 2017": Cat17,
  "Product Catalog 2016": Cat16,
  "Product Catalog 2015": Cat15,
};

const initialFallbackList = [
  {
    id: 1,
    cname: "Product Catalog 2023",
    cdate: "January, 2023",
    cImg: Cat23,
  },
  {
    id: 2,
    cname: "Product Catalog 2017",
    cdate: "February, 2017",
    cImg: Cat17,
  },
  {
    id: 3,
    cname: "Product Catalog 2016",
    cdate: "January, 2016",
    cImg: Cat16,
  },
  {
    id: 4,
    cname: "Product Catalog 2015",
    cdate: "February, 2015",
    cImg: Cat15,
  },
];

function Catalog() {
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogList, setCatalogList] = useState(initialFallbackList);

  useEffect(() => {
    let isMounted = true;
    api
      .getCatalogs()
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;
        const mapped = data.map((item) => ({
          id: item.id,
          cname: item.title || item.cname,
          cdate: item.date_text || item.cdate || "Latest Edition",
          cImg:
            item.thumbnail_url ||
            (item.thumbnail_path
              ? `${STORAGE_BASE_URL}/${item.thumbnail_path}`
              : bundledImages[item.title] || CatPlaceholder),
        }));
        setCatalogList(mapped);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".catalog-card",
        scroller: "body",
        start: "top 90%",
      },
    });

    tl.from(".catalog-card", {
      y: 200,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
  }, [catalogList]);

  const handleOpenRequest = (cat) => {
    setSelectedCatalog(cat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const mapCatalog = catalogList.map((item) => {
    return (
      <div className="col-sm-12 col-md-6 col-lg-4" key={item.id}>
        <Catalogcard
          catImg={item.cImg}
          catName={item.cname}
          catDate={item.cdate}
          onRequest={() => handleOpenRequest(item)}
        />
      </div>
    );
  });

  return (
    <section className="catalog">
      <Pagetitle title="Our Products Catalog" />

      <div className="container py-100">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <p className="text-color-drk fn-18">
              Click on any catalog thumbnail below to request a digital copy.
              Our export and sales team will share the complete catalog and
              pricing with you.
            </p>
          </div>
        </div>

        <div className="row">{mapCatalog}</div>
      </div>

      <CatalogRequestModal
        show={isModalOpen}
        onHide={handleCloseModal}
        catalog={selectedCatalog}
      />
    </section>
  );
}

export default Catalog;
