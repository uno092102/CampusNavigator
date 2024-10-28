import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpButtonClicked, setSignUpButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      setError('');
      // Add authentication logic here
      console.log('Logging in:', { username, password });
    }
  };

  const handleSignUpClick = () => {
    setSignUpButtonClicked(true);
    setTimeout(() => {
      navigate('/signup');
    }, 300); // Simulate a brief delay before navigation
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.filledButton}>
          Login
        </button>

        {/* Sign Up button to navigate to the Signup page */}
        <button
          type="button"
          onClick={handleSignUpClick}
          style={{
            ...styles.signUpButton,
            backgroundColor: signUpButtonClicked ? '#6A0DAD' : 'light',
            color: signUpButtonClicked ? '#ffffff' : '#6A0DAD',
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1e1e1e', // Dark background for dark mode
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    maxWidth: '300px',
    width: '100%',
    backgroundColor: '#2c2c2c', // Darker gray background for the form
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    color: '#ffffff', // White text for dark mode
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #444', // Subtle border for dark mode
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#333333', // Dark input background
    color: '#ffffff', // White text for inputs
  },
  filledButton: {
    padding: '10px',
    backgroundColor: '#6A0DAD', // Purple fill for the login button
    color: '#ffffff', // White text color for contrast
    border: 'none', // No border for a filled look
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '10px',
  },
  signUpButton: {
    padding: '10px',
    border: '2px solid #6A0DAD', // Purple border for a vector look
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  error: {
    color: '#ff4d4f', // Red error text for contrast
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default Login;
