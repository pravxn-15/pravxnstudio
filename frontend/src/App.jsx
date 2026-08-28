import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Imports
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AdminProjects from './admin/AdminProjects';
import AdminServices from './admin/AdminServices';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminEnquiries from './admin/AdminEnquiries';
import AdminSettings from './admin/AdminSettings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#EAE5D9] flex flex-col justify-between">
      {!isAdminRoute && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:cat" element={<Portfolio />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Portal */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/enquiries" element={<AdminEnquiries />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
