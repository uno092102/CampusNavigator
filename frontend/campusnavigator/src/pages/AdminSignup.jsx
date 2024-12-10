import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Individual input error states
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Set the document title
  useEffect(() => {
    document.title = 'Admin Signup - Campus Navigator';
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error states
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setError('');

    // Simple validation
    let valid = true;
    if (name.trim() === '') {
      setNameError(true);
      valid = false;
    }
    if (email.trim() === '') {
      setEmailError(true);
      valid = false;
    }
    if (password.trim() === '') {
      setPasswordError(true);
      valid = false;
    }
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError(true);
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setError('Passwords do not match.');
      valid = false;
    }

    if (!valid) {
      // If no specific error message, set a general one
      if (!error) {
        setError('Please fill in all fields.');
      }
      return;
    }

    try {
      await apiRequest('user/postUserEntity', 'POST', {
        name,
        email,
        password,
        admin: true,
      });
      navigate('/admin/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.logoContainer}>
          <img src="/logoimg/Logolight.svg" alt="CampusNavigator Logo" style={styles.logo} />
          <h1 style={styles.title}>Admin Signup</h1>
        </div>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: nameError ? 'red' : '#ccc',
              }}
            />
          </div>
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
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: confirmPasswordError ? 'red' : '#ccc',
              }}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Signup
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
    marginBottom: '20px',
  },
  logo: {
    width: '300px',
    marginLeft: '20px',
  },
  title: {
    fontSize: '2em',
    color: '#7757FF',
    marginTop: '20px',
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

export default AdminSignup;