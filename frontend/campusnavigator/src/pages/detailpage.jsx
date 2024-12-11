import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';

const App = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <Header />
      <div style={styles.container}>
        <BuildingList />
      </div>
    </div>
  );
};

const Header = () => {
  // States and handlers
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const searchRef = React.useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("user"));
    if (!localUserData) {
      navigate("/login");
    } else {
      // Fetch all users to get the current user's data
      fetch("http://localhost:8080/api/user/getAllSearch")
        .then((response) => response.json())
        .then((usersData) => {
          // Find the current user in the list
          const fullUserData = usersData.find(
            (user) => user.userID === localUserData.userID
          );
          if (fullUserData) {
            setUser(fullUserData);
            console.log("Fetched full user data:", fullUserData);
          } else {
            console.error("User not found in getAllSearch");
            setUser(localUserData); // Use local data if not found
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(localUserData); // Use local data on error
        });
    }
  }, [navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submit (placeholder)
    console.log('Search submitted:', searchText);
  };

  useEffect(() => {
    document.title = 'Building - Campus Navigator';
  }, []);

  const handleResultClick = (item) => {
    // Handle search result click (placeholder)
    console.log('Result clicked:', item);
  };

  const handleNavigateToProfile = () => {
    setDropdownOpen(false);
    navigate("/userprofile");
  };

  const handleFeedback = () => {
    navigate("/Feedback");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      style={{
        position: 'relative',
        backgroundColor: '#7757FF',
        color: '#FFFFFF',
        padding: '20px 40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo and Search */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <Link to="/homepage">
            <img
              src="/logoimg/Logodark.svg"
              alt="Logo"
              style={{ width: '240px', marginRight: '20px' }}
            />
          </Link>
          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            style={{ position: 'relative' }}
            ref={searchRef}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: '300px',
                padding: '8px 12px 8px 40px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: '#FFFFFF',
                color: '#7757FF',
                fontSize: '16px',
              }}
            />
            <FaSearch
              style={{
                position: 'absolute',
                top: '50%',
                left: '12px',
                transform: 'translateY(-50%)',
                color: '#7757FF',
              }}
            />
            {/* Search results dropdown */}
            {searchResults.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  zIndex: 1001,
                  width: '300px',
                  minWidth: '350px',
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                }}
              >
                {searchResults.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ddd',
                      cursor: 'pointer',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                    onClick={() => handleResultClick(item)}
                  >
                    <strong style={{ color: '#7757FF' }}>
                      {item.type === 'building'
                        ? item.building.name
                        : item.poi.name}
                    </strong>
                    <br />
                    <span>
                      {item.type === 'building'
                        ? item.building.description
                        : item.poi.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
        {/* Navigation Links and User Profile */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Navigation Links */}
          <a
            href="/detail"
            style={{
              color: '#FFFFFF',
              marginRight: '30px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Building
          </a>
          <a
            href="/event"
            style={{
              color: '#FFFFFF',
              marginRight: '30px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Calendar
          </a>
          <a
            href="#"
            style={{
              color: '#FFFFFF',
              marginRight: '30px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Service
          </a>
          <a
            href="/announcement"
            style={{
              color: '#FFFFFF',
              marginRight: '30px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Announcement
          </a>
          {/* Notifications */}
          <div style={{ marginRight: '20px', cursor: 'pointer' }}>
            <a href="/notifications" style={{ color: '#FFFFFF' }}>
              <FaBell size={24} />
            </a>
          </div>
          {/* User Profile Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              src="https://picsum.photos/200/300"
              alt="User Profile"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginRight: '10px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
            />
            <span style={{ marginRight: '10px' }}>{user ? user.name : ''}</span>
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: '0',
                  backgroundColor: '#FFFFFF',
                  color: '#7757FF',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                  zIndex: 1001,
                  minWidth: '200px',
                }}
              >
                <div
                  onClick={handleNavigateToProfile}
                  style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                  Profile
                </div>
                <div style={{ padding: '10px 20px', cursor: 'pointer' }}>
                  Help
                </div>
                <div
                  onClick={handleFeedback}
                  style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                  Feedback
                </div>
                <div
                  onClick={handleLogout}
                  style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  useEffect(() => {
    // Fetch buildings data from the API
    fetch('http://localhost:8080/api/buildings')
      .then((response) => response.json())
      .then((data) => {
        setBuildings(data);
      })
      .catch((error) => console.error('Error fetching buildings data:', error));
  }, []);

  if (selectedBuilding) {
    // If a building is selected, display its details
    return (
      <BuildingDetails
        building={selectedBuilding}
        buildings={buildings}
        onBack={() => setSelectedBuilding(null)}
      />
    );
  }

  return (
    <div style={styles.content}>
      <h1 style={styles.pageHeader}>Campus Building</h1>
      <ul style={styles.buildingList}>
        {buildings.map((building) => (
          <li
            key={building.buildingID}
            style={styles.buildingItem}
            onClick={() => setSelectedBuilding(building)}
          >
            <img
              src={building.mapData.mapImageURL}
              alt={building.name}
              style={styles.buildingItemImage}
            />
            <div style={styles.buildingItemInfo}>
              <h2 style={styles.buildingItemName}>{building.name}</h2>
              <p style={styles.buildingItemDescription}>
                {building.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BuildingDetails = ({ building, buildings, onBack }) => {
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestBuildingName, setNearestBuildingName] = useState('an unknown location');

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("user"));
    if (!localUserData) {
      console.error("No user data found in localStorage");
      // Optionally navigate to login or handle accordingly
    } else {
      fetch("http://localhost:8080/api/user/getAllSearch")
        .then((response) => response.json())
        .then((usersData) => {
          // Find the current user in the list
          const fullUserData = usersData.find(
            (user) => user.userID === localUserData.userID
          );
          if (fullUserData) {
            if (fullUserData.geolocationData && fullUserData.geolocationData.length > 0) {
              const geoData = fullUserData.geolocationData[0];
              setUserLocation({
                latitude: geoData.latitude,
                longitude: geoData.longitude,
                userName: fullUserData.name,
              });
            } else {
              console.error("No geolocation data available for this user.");
              // Handle absence of geolocation data
              setUserLocation(null);
            }
          } else {
            console.error("User not found in getAllSearch");
            // Handle user not found scenario
          }
        })
        .catch((error) => {
          console.error("Error fetching user geolocation:", error);
          // Handle error accordingly
        });
    }
  }, [buildings]);

  useEffect(() => {
    if (userLocation && buildings) {
      let nearestBuilding = null;
      let minDistance = Infinity;

      buildings.forEach((building) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          building.locationLatitude,
          building.locationLongitude
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestBuilding = building;
        }
      });

      if (nearestBuilding) {
        setNearestBuildingName(nearestBuilding.name);
      } else {
        setNearestBuildingName('an unknown location');
      }
    }
  }, [userLocation, buildings]);

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  return (
    <div style={styles.content}>
      {/* Back Button */}
      <button onClick={onBack} style={styles.backButton}>
        &larr; Back to Campus Building
      </button>

      {/* Building Details Container */}
      <div style={styles.buildingDetailsContainer}>
        {/* Building Image */}
        {building.mapData && (
          <img
            src={building.mapData.mapImageURL}
            alt={building.name}
            style={styles.buildingImage}
          />
        )}

        {/* Building Details */}
        <div style={styles.buildingDetails}>
          <h1 style={styles.buildingName}>{building.name}</h1>
          <p style={styles.buildingDescription}>{building.description}</p>

          {/* Building Location Coordinates */}
          <p style={styles.coordinates}>
            <strong>Coordinates:</strong> {building.locationLatitude},{' '}
            {building.locationLongitude}
          </p>

          {/* Geolocation Info */}
          <div style={styles.geolocation}>
            <p style={styles.geolocationText}>
              Your location is near <strong>{nearestBuildingName}</strong>.
            </p>
          </div>

          {/* Points of Interest */}
          <h2 style={styles.sectionHeader}>Points of Interest</h2>
          <ul style={styles.poiList}>
            {building.pointsOfInterest.map((poi) => (
              <li
                key={poi.poi_ID}
                style={styles.poiItem}
                onClick={() => setSelectedPOI(poi)}
              >
                {poi.name} - {poi.type}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* POI Details */}
      {selectedPOI && (
        <div style={styles.poiDetails}>
          <h2 style={styles.poiName}>{selectedPOI.name}</h2>
          <p style={styles.poiType}>
            <strong>Type:</strong> {selectedPOI.type}
          </p>
          <p style={styles.poiDescription}>{selectedPOI.description}</p>

          {/* POI Location within Building */}
          <img
            src={`https://via.placeholder.com/600x400?text=${encodeURIComponent(
              selectedPOI.name + ' Location'
            )}`}
            alt="POI Location"
            style={styles.poiImage}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFFFFF', // Changed to match theme color
    minHeight: '100vh',
    width: '100%',
  },
  content: {
    padding: '40px',
    backgroundColor: '#FFFFFF', // Changed to match theme color
  },
  pageHeader: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    marginTop: '20px', // Reduced top margin to bring it closer to the header
    color: '#7757FF', // Changed to match theme color
    textAlign: 'center',
  },
  buildingList: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: '-10px', // Adjusted to handle margins in grid items
    marginRight: '-10px',
  },
  buildingItem: {
    width: 'calc(33.333% - 20px)', // Adjusted to fit three per row
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginLeft: '10px',
    marginRight: '10px',
    textAlign: 'center',
  },
  buildingItemImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  buildingItemInfo: {
    flex: '1',
  },
  buildingItemName: {
    fontSize: '24px',
    fontWeight: 'bold', // Made the building name bold
    margin: '0 0 10px 0',
    color: '#7757FF', // Changed to match theme color
  },
  buildingItemDescription: {
    fontSize: '16px',
    color: '#555',
  },
  backButton: {
    marginBottom: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#7757FF', // Changed to match theme color
    color: '#FFFFFF', // Changed to match theme color
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  backButtonPOI: {
    marginTop: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#7757FF', // Changed to match theme color
    color: '#FFFFFF', // Changed to match theme color
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buildingDetailsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
    gap: '20px',
  },
  buildingImage: {
    flex: '1',
    maxWidth: '400px', // Adjusted width for left side placement
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  buildingDetails: {
    flex: '2',
    minWidth: '300px',
  },
  buildingName: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#7757FF', // Changed to match theme color
  },
  buildingDescription: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
  },
  coordinates: {
    fontSize: '14px',
    color: '#777',
    marginTop: '10px',
  },
  sectionHeader: {
    fontSize: '24px',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#7757FF', // Changed to match theme color
    borderBottom: '2px solid #ddd',
    paddingBottom: '5px',
  },
  poiList: {
    listStyleType: 'none',
    padding: '0',
    maxHeight: '300px', // Set a max height
    overflowY: 'auto', // Enable scrolling if content exceeds max height
  },
  poiItem: {
    fontSize: '16px',
    color: '#333',
    padding: '5px 0',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
  },
  poiDetails: {
    marginTop: '20px',
  },
  poiName: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#7757FF', // Changed to match theme color
  },
  poiType: {
    fontSize: '16px',
    color: '#777',
    marginBottom: '10px',
  },
  poiDescription: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
  },
  poiImage: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    marginTop: '15px',
    borderRadius: '4px',
    display: 'block',
    margin: '0 auto', // Center the image
  },
  eventsList: {
    listStyleType: 'none',
    padding: '0',
    maxHeight: '200px', // Set a max height
    overflowY: 'auto', // Enable scrolling if content exceeds max height
  },
  eventItem: {
    fontSize: '16px',
    color: '#333',
    padding: '5px 0',
    borderBottom: '1px solid #eee',
  },
  geolocation: {
    marginTop: '20px',
    backgroundColor: '#FFFFFF', // Changed to match theme color
    borderRadius: '8px',
    textAlign: 'left', // Align to left side
  },
  geolocationText: {
    fontSize: '16px',
    color: '#7757FF', // Changed to match theme color
    marginBottom: '0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#7757FF', // Changed to match theme color
    color: '#FFFFFF', // Changed to match theme color
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default App;