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

const Login = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(backgroundImages[0]);

  useEffect(() => {
    document.title = "Login - CampusNavigator";
    const switchBackground = () => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setCurrentImage(backgroundImages[randomIndex]);
    };
    const interval = setInterval(switchBackground, Math.random() * 5000 + 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={currentImage} alt="Background" className="background-image" />
      </div>
      <div className="signup-right">
        <img src="/logoimg/Logolight.svg" alt="Logo" className="logo" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <button className="link-button" onClick={handleSignup}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;