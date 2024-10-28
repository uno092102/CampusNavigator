import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
    } else {
      setError('');
      console.log('Signing up:', { username, email, password });
      // Optionally navigate to the login page after signing up
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2 style={styles.title}>Sign Up</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </button>

        {/* Login button to navigate back to the Login page */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={styles.loginButton}
        >
          Login
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
    backgroundColor: '#1e1e1e',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    maxWidth: '300px',
    width: '100%',
    backgroundColor: '#2c2c2c',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #444',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#333333',
    color: '#ffffff',
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
  loginButton: {
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#6A0DAD',
    border: '2px solid #6A0DAD',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  error: {
    color: '#ff4d4f',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

styles.filledButton[':hover'] = {
  backgroundColor: '#5b0d9c',
};

styles.loginButton[':hover'] = {
  backgroundColor: '#6A0DAD',
  color: '#ffffff',
};

export default Signup;
