import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Pagetitle from "../../components/public/Pagetitle";
import Productcard from "../../components/public/Productcard";
import { SlideshowLightbox } from "lightbox.js-react";
import { Products } from "../../data/data";

function ProductDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  let { shape } = useParams();

  // Filter products based on shape
  const filteredProducts = Products.filter((p) => shape === p.shape);

  // Create an array of images with src and alt properties
  const images = filteredProducts
    .map((product) => ({
      src: Array.isArray(product.imgpath)
        ? product.imgpath[0]
        : product.imgpath,
      alt: product.pname, // You can use any property for alt text
    }))
    .filter((img) => img.src && img.src !== ""); // Ensure no empty or invalid images

  // Open Lightbox with the correct index
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <section className="product-details">
      <Pagetitle title={"Product Shape"} />
      <div className="py-100">
        <div className="container">
          <div className="row g-lg-5 g-md-5 gy-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="col-sm-12 col-md-4 col-lg-4"
                  onClick={() => openLightbox(index)} // Pass the index directly
                  style={{ cursor: "pointer" }}
                >
                  <Productcard pData={product} />
                </div>
              ))
            ) : (
              <p className="text-center">No products found for this shape.</p>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {images.length > 0 && (
        <SlideshowLightbox
          images={images} // Ensure images is an array of objects with src and alt
          showThumbnails={true}
          showControls={true}
          theme="lightbox"
          open={isOpen} // Controls whether the lightbox is open
          lightboxIdentifier="product-lightbox"
          index={currentIndex} // Correct image index to display
          onClose={() => setIsOpen(false)} // Close the lightbox
        />
      )}
    </section>
  );
}

export default ProductDetails;
