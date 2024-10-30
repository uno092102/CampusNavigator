import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import './login.css';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = "Login - CampusNavigator";
    const switchBackground = () => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setCurrentImage(backgroundImages[randomIndex]);
    };
    const interval = setInterval(switchBackground, Math.random() * 5000 + 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/getAllSearch");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        navigate('/homepage');
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
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
           {errorMessage && <p className="error-message">{errorMessage}</p>}
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
