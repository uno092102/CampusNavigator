// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import existing pages
import Signup from './pages/signup';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Events from './pages/events';
import Feedback from './pages/Feedback';
import Userprofile from './pages/UserProfilePage';
import Notification from './pages/notification';
import Detail from './pages/detailpage';
import Announcement from './pages/Announcement';

// Import admin pages
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';

// Import PrivateRoute component
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/event" element={<Events />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/userprofile" element={<Userprofile />} />
      <Route path="/Feedback" element={<Feedback />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/announcement" element={<Announcement />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;