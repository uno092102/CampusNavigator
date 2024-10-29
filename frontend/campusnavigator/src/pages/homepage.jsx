import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Homepage = () => {
  const styles = {
    homepage: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
    },
    searchBar: {
      display: 'flex',
      gap: '0.5rem',
    },
    dropdown: {
      padding: '0.5rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    content: {
      display: 'flex',
      flex: 1,
    },
    poiList: {
      width: '40%',
      padding: '1rem',
      overflowY: 'auto',
      borderRight: '1px solid #ddd',
    },
    poiCategories: {
      display: 'flex',
      gap: '0.5rem',
    },
    button: {
      padding: '0.5rem',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      border: 'none',
      cursor: 'pointer',
    },
    poiItem: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      padding: '0.5rem',
    },
    poiImage: {
      width: '80px',
      height: '80px',
      borderRadius: '5px',
    },
    poiInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    mapContainer: {
      width: '60%',
      height: '100%',
    },
  };

  return (
    <div style={styles.homepage}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.searchBar}>
          <select style={styles.dropdown}>
            <option value="POI">POI</option>
          </select>
          <select style={styles.dropdown}>
            <option value="NGE">NGE</option>
          </select>
          <button style={styles.dropdown}>🔍</button>
        </div>
        <div style={styles.contactInfo}>
          <span>📞 +63 32 261 7741</span>
          <span>Math Lee</span>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Points of Interest List */}
        <div style={styles.poiList}>
          <h2>Point of Interest</h2>
          <div style={styles.poiCategories}>
            <button style={styles.button}>Buildings</button>
            <button style={styles.button}>Amenities</button>
            <button style={styles.button}>Academic Departments</button>
          </div>
          
          {/* POI Item */}
          <div style={styles.poiItem}>
            <img src="nge_building.jpg" alt="NGE Building" style={styles.poiImage} />
            <div style={styles.poiInfo}>
              <h3>NGE Building</h3>
              <p>Also known as the Science and Technology Building, inaugurated in 2002.</p>
              <span>Dr. Nicolas G. Escario</span>
            </div>
          </div>

          <div style={styles.poiItem}>
            <img src="college_library.jpg" alt="College Library" style={styles.poiImage} />
            <div style={styles.poiInfo}>
              <h3>College Library</h3>
              <p>Serves as a vital academic support hub.</p>
              <span>Cebu Institute of Technology - University</span>
            </div>
          </div>

          <div style={styles.poiItem}>
            <img src="gle_building.jpg" alt="GLE Building" style={styles.poiImage} />
            <div style={styles.poiInfo}>
              <h3>GLE Building</h3>
              <p>Multi-purpose building with lecture hall-style rooms.</p>
              <span>Gregorio L. Escario Building</span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div style={styles.mapContainer}>
          <MapContainer center={[34.0522, -118.2437]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[34.0522, -118.2437]}>
              <Popup>GLE Building</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
