import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Homepage from './pages/homepage';
import Login from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  );
}

export default App;