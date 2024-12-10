// src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../utils/auth';
import { apiRequest } from '../utils/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    admin: false,
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
        const users = await apiRequest('user/getAllSearch');
        setUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message || 'Error fetching users.');
    }
};

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('user/postUserEntity', 'POST', newUser);
      setNewUser({ name: '', email: '', password: '', admin: false });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError('Error creating user.');
    }
  };

  const handleUpdateUser = async (user) => {
    try {
        const response = await apiRequest(
            `user/putUserRecord/${user.userID}`, // Note: no leading slash
            'PUT',
            user
        );
        if (response) {
            // Handle successful update
            fetchUsers(); // Refresh user list
        }
    } catch (error) {
        console.error('Error updating user:', error);
        setError(error.message || 'Error updating user.');
    }
};

  const handleDeleteUser = async (userID) => {
    try {
      await apiRequest(`user/deleteUser/${userID}`, 'DELETE');
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError('Error deleting user.');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>CampusNavigator Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      {error && <p style={styles.error}>{error}</p>}

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Create New User</h2>
        <form onSubmit={handleCreateUser} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
              style={styles.input}
            />
          </div>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={newUser.admin}
                onChange={(e) =>
                  setNewUser({ ...newUser, admin: e.target.checked })
                }
                style={styles.checkbox}
              />
              Is Admin
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Create User
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>User Management</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>UserID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Is Admin</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                key={user.userID}
                user={user}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

const UserRow = ({ user, onUpdate, onDelete }) => {
  const [editableUser, setEditableUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(editableUser);
    setIsEditing(false);
  };

  return (
    <tr>
      <td style={styles.td}>{user.userID}</td>
      <td style={styles.td}>
        {isEditing ? (
          <input
            type="text"
            value={editableUser.name}
            onChange={(e) =>
              setEditableUser({ ...editableUser, name: e.target.value })
            }
            style={styles.input}
          />
        ) : (
          user.name
        )}
      </td>
      <td style={styles.td}>
        {isEditing ? (
          <input
            type="email"
            value={editableUser.email}
            onChange={(e) =>
              setEditableUser({ ...editableUser, email: e.target.value })
            }
            style={styles.input}
          />
        ) : (
          user.email
        )}
      </td>
      <td style={styles.td}>
        {isEditing ? (
          <input
            type="checkbox"
            checked={editableUser.admin}
            onChange={(e) =>
              setEditableUser({ ...editableUser, admin: e.target.checked })
            }
            style={styles.checkbox}
          />
        ) : editableUser.admin ? (
          'Yes'
        ) : (
          'No'
        )}
      </td>
      <td style={styles.td}>
        {isEditing ? (
          <>
            <button onClick={handleSave} style={styles.actionButton}>
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditableUser(user);
              }}
              style={styles.actionButton}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} style={styles.actionButton}>
              Edit
            </button>
            <button
              onClick={() => onDelete(user.userID)}
              style={styles.actionButton}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    padding: '20px',
    color: '#000',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2em',
    color: '#7757FF',
  },
  logoutButton: {
    padding: '10px 15px',
    backgroundColor: '#FF4D4D',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.5em',
    color: '#7757FF',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  inputGroup: {
    flex: '1 1 200px',
    marginRight: '20px',
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outlineColor: '#7757FF',
  },
  checkboxGroup: {
    flex: '1 1 100%',
    marginBottom: '15px',
  },
  checkboxLabel: {
    fontWeight: 'bold',
  },
  checkbox: {
    marginRight: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#7757FF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #7757FF',
    textAlign: 'left',
    padding: '10px',
    color: '#7757FF',
  },
  td: {
    borderBottom: '1px solid #ccc',
    padding: '10px',
  },
  actionButton: {
    marginRight: '5px',
    padding: '5px 10px',
    backgroundColor: '#7757FF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
};

export default AdminDashboard;