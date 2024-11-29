import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const backgroundImages = [
  "/backgroundimg/Accreditation-Room.jpg",
  "/backgroundimg/Case-Room.jpg",
  "/backgroundimg/Covered-Court.jpg",
  "/backgroundimg/Fine-Dining.jpg",
  "/backgroundimg/GLE-Building.jpg",
  "/backgroundimg/Kitchen-01.jpg",
  "/backgroundimg/Learning-Resource-and-Activity-Center-01.jpg",
  "/backgroundimg/Learning-Resource-and-Activity-Center-02.jpg",
  "/backgroundimg/Learning-Resource-and-Activity-Center-03.jpg",
  "/backgroundimg/Matisse-Room.jpg",
  "/backgroundimg/SAL-Building.jpg",
  "/backgroundimg/Smart-Classroom.jpg",
  "/backgroundimg/Wildcat-Innovation-Labs-01.jpg"
];

const Signup = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(backgroundImages[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = "Sign Up - CampusNavigator";
    const switchBackground = () => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setCurrentImage(backgroundImages[randomIndex]);
    };
    const interval = setInterval(switchBackground, Math.random() * 5000 + 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password };

    try {
      const response = await fetch("http://localhost:8080/api/user/postUserEntity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdUser = await response.json();

      const geolocationData = {
        latitude: 10.294337,
        longitude: -236.118532, // Out-of-range value
        timestamp: new Date().toISOString(),
        user: {
          userID: createdUser.userID,
        },
      };
      
      try {
        const geoResponse = await fetch("http://localhost:8080/api/geolocation/postGeolocation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geolocationData), // Send the payload as-is
        });
      
        if (!geoResponse.ok) {
          throw new Error(`HTTP error! status: ${geoResponse.status}`);
        }
      
        const responseData = await geoResponse.json();
        console.log("Geolocation saved successfully:", responseData);
      } catch (error) {
        console.error("Failed to save geolocation:", error);
      }

      navigate('/login');
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const handleLogin = (e) => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={currentImage} alt="Background" className="background-image" />
      </div>
      <div className="signup-right">
        <img src="/logoimg/Logolight.svg" alt="Logo" className="logo" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input 
            type="text" 
            placeholder="Username" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
        <p>
          Already have an account? <button className="link-button" onClick={handleLogin}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;