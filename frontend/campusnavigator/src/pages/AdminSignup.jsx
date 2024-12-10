// src/pages/AdminSignup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(true); // All signups are admins
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await apiRequest('user/postUserEntity', 'POST', {
        name,
        email,
        password,
        admin,
      });
      navigate('/admin/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CampusNavigator Admin Signup</h1>
      <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
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
        <button type="submit" style={styles.button}>Signup</button>
      </form>
    </div>
  );
};

const styles = {
  // Styles are the same as in AdminLogin, you can reuse them
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

export default AdminSignup;