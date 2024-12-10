import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateAdmin } from '../utils/auth';
import { apiRequest } from '../utils/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Set the document title
  useEffect(() => {
    document.title = 'Admin Login - Campus Navigator';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Reset error states
    setEmailError(false);
    setPasswordError(false);
    setError('');

    // Simple validation
    let valid = true;
    if (email.trim() === '') {
      setEmailError(true);
      valid = false;
    }
    if (password.trim() === '') {
      setPasswordError(true);
      valid = false;
    }

    if (!valid) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const users = await apiRequest('user/getAllSearch', 'GET');
      const adminUser = users.find(
        (user) => user.email === email && user.password === password && user.admin
      );
      if (adminUser) {
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
      <div style={styles.formContainer}>
        <div style={styles.logoContainer}>
          <img src="/logoimg/Logolight.svg" alt="CampusNavigator Logo" style={styles.logo} />
          <h1 style={styles.title}>Admin Login</h1>
        </div>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: emailError ? 'red' : '#ccc',
              }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: passwordError ? 'red' : '#ccc',
              }}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(to bottom, #7757FF, #FFFFFF)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px #ccc',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '300px',
    marginLeft: '20px',
  },
  title: {
    fontSize: '2em',
    color: '#7757FF',
  },
  form: {
    width: '100%',
    display: 'block',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
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
    border: '1px solid',
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