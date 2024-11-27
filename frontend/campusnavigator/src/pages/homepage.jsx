import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { FaBell } from 'react-icons/fa';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const redIcon = L.divIcon({
  className: 'custom-div-icon',
  html: "<div style='background-color:red; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;'></div>",
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userGeolocationId, setUserGeolocationId] = useState(null);
  const [developerMode, setDeveloperMode] = useState(false);
  const [addingBuilding, setAddingBuilding] = useState(false);
  const [newBuildingPosition, setNewBuildingPosition] = useState(null);
  const [newBuildingData, setNewBuildingData] = useState({
    name: '',
    description: '',
    mapImageURL: ''
  });
  const [newPOIData, setNewPOIData] = useState({
    name: '',
    description: '',
    type: ''
  });
  const [editingPOI, setEditingPOI] = useState(null);
  const [editPOIData, setEditPOIData] = useState({
    name: '',
    description: '',
    type: ''
  });
  const [updatingGeolocation, setUpdatingGeolocation] = useState(false);
  const searchRef = useRef(null);
  const bounds = [
    [10.294210, -236.118527],
    [10.294163, -236.120041],
    [10.294622, -236.118651],
    [10.296511, -236.120567],
    [10.296480, -236.119080],
  ];

  useEffect(() => {
    document.title = "Home - CampusNavigator";
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:8080/api/buildings')
      .then(response => response.json())
      .then(data => {
        setBuildings(data);
      })
      .catch(error => console.error('Error fetching buildings:', error));
  }, []);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:8080/api/geolocation/getAllGeolocation')
        .then(response => response.json())
        .then(data => {
          const userGeo = data.find(g => g.userID === user.userID);
          if (userGeo) {
            setUserLocation({ latitude: userGeo.latitude, longitude: userGeo.longitude });
            setUserGeolocationId(userGeo.geolocationID);
          } else {
            const newGeoData = {
              latitude: 0,
              longitude: 0,
              timeStamp: new Date().toISOString(),
              userID: user.userID
            };
            fetch('http://localhost:8080/api/geolocation/postGeolocation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newGeoData)
            })
            .then(response => response.json())
            .then(newGeo => {
              setUserLocation({ latitude: newGeo.latitude, longitude: newGeo.longitude });
              setUserGeolocationId(newGeo.geolocationID);
            })
            .catch(error => console.error('Error creating user geolocation:', error));
          }
        })
        .catch(error => console.error('Error fetching user geolocation:', error));
    }
  }, [user]);

  const getMapImage = (buildingID) => {
    const building = buildings.find(b => b.buildingID === buildingID);
    if (!building || !building.mapData) return null;
    return building.mapData.mapImageURL;
  };

  const handleMarkerClick = (building) => {
    const imageURL = getMapImage(building.buildingID);
    const buildingPOIs = building.pointsOfInterest || [];
    setSelectedBuilding({ ...building, imageURL, pois: buildingPOIs });
  };

  const handleCloseCard = () => {
    setSelectedBuilding(null);
    setEditingPOI(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const text = searchText.trim().toLowerCase();
    if (!text) return;
    const matchedBuildings = buildings.filter(b =>
      (b.name && b.name.toLowerCase().includes(text)) ||
      (b.description && b.description.toLowerCase().includes(text)) ||
      (b.pointsOfInterest && b.pointsOfInterest.some(p =>
        (p.name && p.name.toLowerCase().includes(text)) ||
        (p.description && p.description.toLowerCase().includes(text))
      ))
    );
    setSearchResults(matchedBuildings);
    setSelectedBuilding(null);
    postSearchRecord(text);
  };

  const postSearchRecord = (text) => {
    const data = {
      searchText: text,
      timeStamp: new Date().toISOString()
    };
    fetch('http://localhost:8080/api/search/postSearchEntity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .catch(error => console.error('Error posting search record:', error));
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEnableDevelopersMode = () => {
    setDeveloperMode(true);
  };

  const handleAddBuildingClick = () => {
    setAddingBuilding(true);
    setNewBuildingPosition(null);
  };

  const handleMapClick = (e) => {
    if (addingBuilding) {
      setNewBuildingPosition(e.latlng);
      setAddingBuilding(false);
    } else if (updatingGeolocation) {
      const data = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        timeStamp: new Date().toISOString(),
        userID: user.userID
      };
      fetch(`http://localhost:8080/api/geolocation/putGeolocation/${userGeolocationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(() => {
        setUserLocation({ latitude: data.latitude, longitude: data.longitude });
        setUpdatingGeolocation(false);
      })
      .catch(error => console.error('Error updating geolocation:', error));
    }
  };

  const handleNewBuildingChange = (e) => {
    const { name, value } = e.target;
    setNewBuildingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitNewBuilding = (e) => {
    e.preventDefault();
    const data = {
      name: newBuildingData.name,
      description: newBuildingData.description,
      locationLatitude: newBuildingPosition.lat,
      locationLongitude: newBuildingPosition.lng,
      mapData: {
        mapImageURL: newBuildingData.mapImageURL
      }
    };
    fetch('http://localhost:8080/api/buildings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
      setBuildings(prevBuildings => [...prevBuildings, responseData]);
      setNewBuildingPosition(null);
      setNewBuildingData({ name: '', description: '', mapImageURL: '' });
    })
    .catch(error => console.error('Error adding new building:', error));
  };

  const handleDeleteBuilding = (buildingID, mapID) => {
    fetch(`http://localhost:8080/api/buildings/${buildingID}`, {
      method: 'DELETE',
    })
    .then(() => {
      fetch(`http://localhost:8080/api/maps/${mapID}`, {
        method: 'DELETE',
      })
      .catch(error => console.error('Error deleting map data:', error));
      setBuildings(prevBuildings => prevBuildings.filter(b => b.buildingID !== buildingID));
      setSelectedBuilding(null);
    })
    .catch(error => console.error('Error deleting building:', error));
  };

  const handleNewPOIChange = (e) => {
    const { name, value } = e.target;
    setNewPOIData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitNewPOI = (e) => {
    e.preventDefault();
    const data = {
      buildingId: selectedBuilding.buildingID,
      name: newPOIData.name,
      description: newPOIData.description,
      type: newPOIData.type
    };
    fetch('http://localhost:8080/api/pois', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(newPOI => {
      setSelectedBuilding(prevBuilding => ({
        ...prevBuilding,
        pois: [...prevBuilding.pois, newPOI]
      }));
      setNewPOIData({ name: '', description: '', type: '' });
    })
    .catch(error => console.error('Error adding new POI:', error));
  };

  const handleDeletePOI = (poiID) => {
    fetch(`http://localhost:8080/api/pois/${poiID}`, {
      method: 'DELETE',
    })
    .then(() => {
      setSelectedBuilding(prevBuilding => ({
        ...prevBuilding,
        pois: prevBuilding.pois.filter(poi => poi.poi_ID !== poiID)
      }));
    })
    .catch(error => console.error('Error deleting POI:', error));
  };

  const handleEditPOI = (poi) => {
    setEditingPOI(poi);
    setEditPOIData({
      name: poi.name,
      description: poi.description,
      type: poi.type
    });
  };

  const handleEditPOIChange = (e) => {
    const { name, value } = e.target;
    setEditPOIData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitEditPOI = (e) => {
    e.preventDefault();
    const data = {
      buildingId: selectedBuilding.buildingID,
      name: editPOIData.name,
      description: editPOIData.description,
      type: editPOIData.type
    };
    fetch(`http://localhost:8080/api/pois/${editingPOI.poi_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(() => {
      setSelectedBuilding(prevBuilding => ({
        ...prevBuilding,
        pois: prevBuilding.pois.map(poi =>
          poi.poi_ID === editingPOI.poi_ID ? { ...poi, ...data, poi_ID: editingPOI.poi_ID } : poi
        )
      }));
      setEditingPOI(null);
    })
    .catch(error => console.error('Error editing POI:', error));
  };

  
    const handleFeedbackPage = () => {
      navigate("/feedback"); 
    };

  const handleUpdateGeolocationClick = () => {
    setUpdatingGeolocation(true);
  };

  const MapClickHandler = () => {
    useMapEvent('click', handleMapClick);
    return null;
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <header style={{ position: 'relative', backgroundColor: '#7757FF', color: '#FFFFFF', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logoimg/Logodark.svg" alt="Logo" style={{ width: '60%', marginRight: '20px' }} />
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '300px' }} ref={searchRef}>
              <FaSearch style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#7757FF' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  borderRadius: '20px',
                  border: '1px solid #FFFFFF',
                  backgroundColor: '#FFFFFF',
                  color: '#7757FF'
                }}
              />
              {searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  right: '0',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1001
                }}>
                  {searchResults.map(b => (
                    <div key={b.buildingID} style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleMarkerClick(b)}>
                      <strong style={{ color: '#7757FF' }}>{b.name}</strong><br />
                      <span>{b.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
          <div>
          <a href="event" style={{ color: '#FFFFFF', width: '20px', marginRight: '10', textDecoration: 'none', fontSize: '18px' }}>Calendar</a>
        </div>
        <div>
          <a href="event" style={{ color: '#FFFFFF', width: '20px', marginRight: '10', textDecoration: 'none', fontSize: '18px' }}>Campus Service</a>
        </div>
        <div>
          <a href="event" style={{ color: '#FFFFFF', width: '20px', marginRight: '10', textDecoration: 'none', fontSize: '18px' }}>Announcement</a>
        </div>
        <div style={{ marginRight: '10px', cursor: 'pointer' }}>
          <useNavigate to="/notification" style={{ color: '#FFFFFF' }}>
            <FaBell size={24} />
          </useNavigate>
        </div>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <img
              src="https://picsum.photos/200/300"
              alt="User Profile"
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', cursor: 'pointer' }}
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
            />
            <span style={{ marginRight: '10px' }}>{user ? user.name : ''}</span>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '60px',
                right: '0',
                backgroundColor: '#FFFFFF',
                color: '#7757FF',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                zIndex: 1001
              }}>
                <div onClick={handleEnableDevelopersMode} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                  Enable developers mode
                </div>
                <div style={{ padding: '10px 20px', cursor: 'pointer' }}>
                  Profile
                </div>
                <div style={{ padding: '10px 20px', cursor: 'pointer' }}>
                  Help
                </div>
                <div onClick={handleFeedbackPage}style={{ padding: '10px 20px', cursor: 'pointer' }}>
                  Feedback
                </div>
                <div onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <MapContainer
        center={[10.294210, -236.118527]}
        zoom={18}
        maxZoom={18}
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
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
          <Marker
            key={building.buildingID}
            position={[building.locationLatitude, building.locationLongitude]}
            eventHandlers={{
              click: () => handleMarkerClick(building)
            }}
          >
            <Popup>
              <strong>{building.name}</strong><br />
              {building.description}
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={redIcon}>
            <Popup>
              You're Here
            </Popup>
          </Marker>
        )}
        {(addingBuilding || updatingGeolocation) && <MapClickHandler />}
      </MapContainer>
      {selectedBuilding && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          width: '300px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          padding: '20px',
          zIndex: 1000,
          overflowY: 'auto',
          maxHeight: '80vh'
        }}>
          <button onClick={handleCloseCard} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}>×</button>
          <h2 style={{ color: '#7757FF' }}>{selectedBuilding.name}</h2>
          {selectedBuilding.imageURL ? (
            <img src={selectedBuilding.imageURL} alt={selectedBuilding.name} style={{ width: '100%', borderRadius: '4px' }} />
          ) : (
            <p>No image available</p>
          )}
          <p>{selectedBuilding.description}</p>
          {selectedBuilding.pois && selectedBuilding.pois.length > 0 ? (
            <div>
              <h3 style={{ color: '#7757FF' }}>Points of Interest</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {selectedBuilding.pois.map(poi => (
                  <li key={poi.poi_ID} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                    <strong style={{ color: '#7757FF' }}>{poi.name}</strong><br />
                    <span>{poi.description}</span><br />
                    <em>Type: {poi.type}</em>
                    {developerMode && (
                      <div style={{ marginTop: '5px' }}>
                        <button onClick={() => handleEditPOI(poi)} style={{
                          marginRight: '5px',
                          backgroundColor: '#7757FF',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '5px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>Edit</button>
                        <button onClick={() => handleDeletePOI(poi.poi_ID)} style={{
                          backgroundColor: 'red',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '5px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>Delete</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No Points of Interest available.</p>
          )}
          {editingPOI && (
            <div>
              <h3 style={{ color: '#7757FF' }}>Edit Point of Interest</h3>
              <form onSubmit={handleSubmitEditPOI}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>POI Name</label>
                  <input type="text" name="name" value={editPOIData.name} onChange={handleEditPOIChange} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                  <textarea name="description" value={editPOIData.description} onChange={handleEditPOIChange} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
                  <input type="text" name="type" value={editPOIData.type} onChange={handleEditPOIChange} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <button type="submit" style={{
                  backgroundColor: '#7757FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}>Save Changes</button>
              </form>
            </div>
          )}
          {developerMode && !editingPOI && (
            <div>
              <h3 style={{ color: '#7757FF' }}>Add Point of Interest</h3>
              <form onSubmit={handleSubmitNewPOI}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>POI Name</label>
                  <input type="text" name="name" value={newPOIData.name} onChange={handleNewPOIChange} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                  <textarea name="description" value={newPOIData.description} onChange={handleNewPOIChange} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
                  <input type="text" name="type" value={newPOIData.type} onChange={handleNewPOIChange} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <button type="submit" style={{
                  backgroundColor: '#7757FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}>Add POI</button>
              </form>
            </div>
          )}
          {developerMode && (
            <button onClick={() => handleDeleteBuilding(selectedBuilding.buildingID, selectedBuilding.mapData.mapID)} style={{
              marginTop: '10px',
              backgroundColor: 'red',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}>Delete Building</button>
          )}
        </div>
      )}
      {developerMode && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          <button onClick={handleAddBuildingClick} style={{
            backgroundColor: '#7757FF',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>
            <FaPlus /> Add Building
          </button>
          <button onClick={handleUpdateGeolocationClick} style={{
            backgroundColor: '#7757FF',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Update Geolocation
          </button>
        </div>
      )}
      {newBuildingPosition && (
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          <h2 style={{ color: '#7757FF' }}>Add New Building</h2>
          <form onSubmit={handleSubmitNewBuilding}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Building Name</label>
              <input type="text" name="name" value={newBuildingData.name} onChange={handleNewBuildingChange} style={{ width: '100%', padding: '8px' }} required />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Building Description</label>
              <textarea name="description" value={newBuildingData.description} onChange={handleNewBuildingChange} style={{ width: '100%', padding: '8px' }} required />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Building Image URL</label>
              <input type="text" name="mapImageURL" value={newBuildingData.mapImageURL} onChange={handleNewBuildingChange} style={{ width: '100%', padding: '8px' }} required />
            </div>
            <button type="submit" style={{
              backgroundColor: '#7757FF',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}>Add Building</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;