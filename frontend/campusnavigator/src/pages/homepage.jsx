// frontend/campusnavigator/src/pages/homepage.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HomePage = () => {
  const username = "MasuRii";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buildings, setBuildings] = useState([]);

  const bounds = [
    [10.294210, -236.118527],
    [10.294163, -236.120041],
    [10.294622, -236.118651],
    [10.296511, -236.120567],
    [10.296480, -236.119080],
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/buildings')
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <header style={{ backgroundColor: '#7757FF', color: '#FFFFFF', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logoimg/Logodark.svg" alt="Logo" style={{ width: '60%', marginRight: '20px' }} />
            <div style={{ position: 'relative', width: '300px' }}>
              <FaSearch style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#7757FF' }} />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ 
                  width: '100%', 
                  padding: '10px 10px 10px 40px', 
                  borderRadius: '20px', 
                  border: '1px solid #FFFFFF', 
                  backgroundColor: '#FFFFFF', 
                  color: '#7757FF'
                }} 
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <img 
              src="https://placehold.co/600x400@2x.png" 
              alt="User Profile" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', cursor: 'pointer' }} 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
            />
            <span style={{ marginRight: '10px' }}>{username}</span>
            {dropdownOpen && (
              <div style={{ 
                position: 'absolute', 
                top: '60px', 
                right: '0', 
                backgroundColor: '#FFFFFF', 
                color: '#7757FF', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
                overflow: 'hidden' 
              }}>
                <Link to="/profile" style={{ display: 'block', padding: '10px 20px', textDecoration: 'none', color: '#7757FF' }}>My Profile</Link>
                <Link to="/settings" style={{ display: 'block', padding: '10px 20px', textDecoration: 'none', color: '#7757FF' }}>Settings</Link>
                <Link to="/logout" style={{ display: 'block', padding: '10px 20px', textDecoration: 'none', color: '#7757FF' }}>Logout</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main style={{ height: '100vh' }}>
        <MapContainer 
          center={[10.294210, -236.118527]} 
          zoom={18} 
          maxZoom={18} 
          style={{ height: '100vh', width: '100%' }}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {buildings.map(building => (
            <Marker key={building.buildingID} position={[building.locationLatitude, building.locationLongitude]}>
              <Popup>
                <strong>{building.name}</strong><br />{building.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
  );
}

export default HomePage;