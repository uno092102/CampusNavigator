// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../utils/auth';
import { apiRequest } from '../utils/api';

// Material-UI components and icons
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Container,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Tooltip,
  IconButton,
} from '@mui/material';

import {
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme with your color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#7757FF', // Your primary color
    },
    background: {
      default: '#FFFFFF', // Background color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Customize as needed
  },
});

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    admin: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set the document title
  useEffect(() => {
    document.title = 'Admin Dashboard - Campus Navigator';
  }, []);

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
        `user/putUserRecord/${user.userID}`,
        'PUT',
        user
      );
      if (response) {
        fetchUsers();
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
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: '#7757FF' }}>
          <Toolbar>
            <img
              src="/logoimg/Logodark.svg"
              alt="CampusNavigator Logo"
              style={{ width: '200px', marginRight: '20px' }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* Spacer for fixed AppBar */}
          <Container maxWidth="lg">
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {/* Create New User Section */}
            <Paper
              sx={{
                p: 3,
                mb: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0px 0px 10px #ccc',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: '#7757FF' }}>
                Create New User
              </Typography>
              <Box
                component="form"
                onSubmit={handleCreateUser}
                sx={{ display: 'block' }} // Ensure form display isn't overridden
              >
                <TextField
                  label="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ style: { color: '#7757FF' } }}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ style: { color: '#7757FF' } }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ style: { color: '#7757FF' } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newUser.admin}
                      onChange={(e) =>
                        setNewUser({ ...newUser, admin: e.target.checked })
                      }
                      sx={{
                        color: '#7757FF',
                        '&.Mui-checked': {
                          color: '#7757FF',
                        },
                      }}
                    />
                  }
                  label="Is Admin"
                  sx={{ color: '#7757FF' }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2, textTransform: 'none' }}
                >
                  Create User
                </Button>
              </Box>
            </Paper>

            {/* User Management Section */}
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0px 0px 10px #ccc',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: '#7757FF' }}>
                User Management
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#7757FF', fontWeight: 'bold' }}>UserID</TableCell>
                      <TableCell sx={{ color: '#7757FF', fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ color: '#7757FF', fontWeight: 'bold' }}>Email</TableCell>
                      <TableCell sx={{ color: '#7757FF', fontWeight: 'bold' }}>Is Admin</TableCell>
                      <TableCell align="right" sx={{ color: '#7757FF', fontWeight: 'bold' }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <UserRow
                        key={user.userID}
                        user={user}
                        onUpdate={handleUpdateUser}
                        onDelete={handleDeleteUser}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const UserRow = ({ user, onUpdate, onDelete }) => {
  const [editableUser, setEditableUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(editableUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableUser(user);
  };

  return (
    <TableRow>
      <TableCell>{user.userID}</TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            value={editableUser.name}
            onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
            size="small"
            required
          />
        ) : (
          user.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            type="email"
            value={editableUser.email}
            onChange={(e) =>
              setEditableUser({ ...editableUser, email: e.target.value })
            }
            size="small"
            required
          />
        ) : (
          user.email
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Checkbox
            checked={editableUser.admin}
            onChange={(e) =>
              setEditableUser({ ...editableUser, admin: e.target.checked })
            }
            sx={{
              color: '#7757FF',
              '&.Mui-checked': {
                color: '#7757FF',
              },
            }}
          />
        ) : editableUser.admin ? (
          'Yes'
        ) : (
          'No'
        )}
      </TableCell>
      <TableCell align="right">
        {isEditing ? (
          <>
            <Tooltip title="Save">
              <IconButton onClick={handleSave} color="primary">
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton onClick={handleCancel} color="inherit">
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => setIsEditing(true)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => onDelete(user.userID)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AdminDashboard;