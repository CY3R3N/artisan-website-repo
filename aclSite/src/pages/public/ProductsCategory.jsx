import React from "react";
import Pagetitle from "../../components/public/Pagetitle";
import Catcard from "../../components/public/Catcard";

function ProductsCategory() {
  return (
    <section className="product-category">
      <Pagetitle />

      <div className="py-100">
        <div className="container">
          <div className="row g-5">
            <div className="col-sm-12 col-md-4 col-lg-4">
              <Catcard to="/products-shape" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <Catcard to="/products-shape" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <Catcard to="/products-shape" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <Catcard to="/products-shape" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <Catcard to="/products-shape" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <Catcard to="/products-shape" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsCategory;
