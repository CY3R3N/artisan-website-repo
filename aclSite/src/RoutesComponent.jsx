import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
// import AdminRoutes from "./routes/AdminRoutes";
import PublicLayout from "./layouts/PublicLayout";
// import AdminLayout from "./layouts/AdminLayout";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/*" element={<PublicLayout />}>
          <Route path="/" element={<PublicRoutes.Home />} />
          <Route path="about-us" element={<PublicRoutes.AboutUs />} />
          <Route
            path="chairman-message"
            element={<PublicRoutes.ChairmanMessage />}
          />
          <Route
            path="board-of-directors"
            element={<PublicRoutes.DirectorsBoard />}
          />
          <Route
            path="executive-committee"
            element={<PublicRoutes.ManagingCommittee />}
          />
          <Route
            path="products-category"
            element={<PublicRoutes.ProductsCategory />}
          />
          <Route
            path="products-shape"
            element={<PublicRoutes.ProductsShape />}
          />
          <Route
            path="product-details"
            element={<PublicRoutes.ProductDetails />}
          />
          <Route path="catalog" element={<PublicRoutes.Catalog />} />
          <Route path="news-events" element={<PublicRoutes.NewsEvents />} />
          <Route path="news-details" element={<PublicRoutes.NewsDetails />} />
          <Route path="contact" element={<PublicRoutes.Contact />} />
        </Route>

        {/* Admin routes (protected) */}
        {/* <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminRoutes.Dashboard />} />
          <Route
            path="manage-products"
            element={<AdminRoutes.ManageProducts />}
          />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
