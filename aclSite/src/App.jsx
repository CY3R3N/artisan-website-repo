import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Home from "./pages/public/Home";
import Ourstory from "./pages/public/Ourstory";
import ChairmanMessage from "./pages/public/ChairmanMessage";
import DirectorsBoard from "./pages/public/DirectorsBoard";
import ManagingCommittee from "./pages/public/ManagingCommittee";
// import ProductsCategory from "./pages/public/ProductsCategory";
import ProductsShape from "./pages/public/ProductsShape";
import ProductDetails from "./pages/public/ProductDetails";
import Catalog from "./pages/public/Catalog";
import NewsEvents from "./pages/public/NewsEvents";
import NewsDetails from "./pages/public/NewsDetails";
import Contact from "./pages/public/Contact";
import Career from "./pages/public/Career";

// Admin CMS pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SectionsManager from "./pages/admin/SectionsManager";
import CatalogManager from "./pages/admin/CatalogManager";
import CatalogRequests from "./pages/admin/CatalogRequests";
import EventsManager from "./pages/admin/EventsManager";
import NewsManager from "./pages/admin/NewsManager";
import TeamManager from "./pages/admin/TeamManager";
import CareersManager from "./pages/admin/CareersManager";
import InquiriesManager from "./pages/admin/InquiriesManager";

import "./App.css";

function App() {
  // Retrieve the saved mode from localStorage or default to light mode
  const initialTheme = localStorage.getItem("theme") === "dark";
  const [isDarkMode, setIsDarkMode] = useState(initialTheme);

  // Toggle theme function (for public site)
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Apply the saved theme on component mount
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        {/* Public Routes with PublicLayout as the parent */}
        <Route
          path="/"
          element={
            <PublicLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="our-story" element={<Ourstory />} />
          <Route path="chairman-message" element={<ChairmanMessage />} />
          <Route path="board-of-directors" element={<DirectorsBoard />} />
          <Route path="executive-committee" element={<ManagingCommittee />} />
          {/* <Route path="products-category" element={<ProductsCategory />} /> */}
          <Route path="products-shape/:path" element={<ProductsShape />} />
          <Route path="product-details/:shape" element={<ProductDetails />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="career" element={<Career />} />
          <Route path="news-events" element={<NewsEvents />} />
          <Route path="news-details" element={<NewsDetails />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Login Route (Publicly accessible) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Dynamic Admin CMS Routes (Protected by Auth Guard) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="sections" element={<SectionsManager />} />
          <Route path="catalogs" element={<CatalogManager />} />
          <Route path="catalog-requests" element={<CatalogRequests />} />
          <Route path="events" element={<EventsManager />} />
          <Route path="news" element={<NewsManager />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="careers" element={<CareersManager />} />
          <Route path="inquiries" element={<InquiriesManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
