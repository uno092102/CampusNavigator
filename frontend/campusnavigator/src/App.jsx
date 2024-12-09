import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Events from './pages/events';
import Feedback from './pages/Feedback';
import Userprofile from './pages/UserProfilePage';
import Notification from './pages/notification';
import Detail from './pages/detailpage';
import CampusService from './pages/campusservice';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CampusService />} />
      <Route path="/event" element={<Events />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/userprofile" element={<Userprofile />} />
      <Route path="/Feedback" element={<Feedback />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/campusservice" element={<CampusService />} />
      
    </Routes>
  );
}

export default App;