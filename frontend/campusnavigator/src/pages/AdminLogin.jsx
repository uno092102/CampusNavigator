// src/pages/AdminLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateAdmin } from '../utils/auth';
import { apiRequest } from '../utils/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch all users
      const users = await apiRequest('user/getAllSearch', 'GET');

      // Find the user with matching email and password
      const adminUser = users.find(
        (user) => user.email === email && user.password === password && user.admin
      );

      if (adminUser) {
        // Authenticate admin
        authenticateAdmin(adminUser);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email, password, or you are not an admin.');
      }
    } catch (err) {
      setError('Error fetching user data.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CampusNavigator Admin Login</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  // ... (same as previous styles)
  container: {
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  title: {
    fontSize: '2em',
    color: '#7757FF',
    marginBottom: '20px',
  },
  form: {
    width: '300px',
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px #ccc',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#7757FF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outlineColor: '#7757FF',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#7757FF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
};

export default AdminLogin;