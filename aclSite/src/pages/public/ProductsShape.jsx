import React from "react";
import { useParams } from "react-router-dom";
import Pagetitle from "../../components/public/Pagetitle";
import Catcard from "../../components/public/Catcard";
import { Category, Products, Shape } from "../../data/data";

function ProductsShape() {
  let { path } = useParams();
  let pTitle =
    Category.find((item) => item.path === path)?.cat_name || "Default Title";

  // Step 1: Extract unique shapes from products in the selected category
  let uniqueShapes = [
    ...new Map(
      Products.filter((product) => product.category === pTitle).map(
        (product) => [product.shape, product]
      ) // Create a Map with unique shapes
    ).values(),
  ];

  // Step 2: Map unique shapes to display them
  let shapeCards = uniqueShapes.map((product) => {
    let shapeData = Shape.find((s) => s.name === product.shape); // Get shape image

    return (
      <div className="col-sm-12 col-md-4 col-lg-4" key={product.shape}>
        <Catcard
          shape={shapeData?.name || product.shape}
          desc={shapeData?.desc || "This is a peice of art"}
          img={shapeData?.img || "default.png"}
        />
      </div>
    );
  });

  return (
    <section className="product-shape">
      <Pagetitle title={pTitle} />

      <div className="py-100">
        <div className="container">
          <div className="row g-5">
            {shapeCards.length > 0 ? (
              shapeCards
            ) : (
              <p>No shapes found for this category.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsShape;
