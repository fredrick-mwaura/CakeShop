import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  // Fetch Users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost/cake-backend/api/getUsers.php');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Add New User
  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || newUser.password.length < 6) {
      toast.error('Please fill all fields correctly.');
      return;
    }

    try {
      const response = await axios.get('http://localhost/cake-backend/api/addUser.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('User added successfully!');
        setUsers((prevUsers) => [...prevUsers, data]);
        setNewUser({ username: '', email: '', password: '' });
      } else {
        toast.error(data.message || 'Failed to add user');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  // Handle Delete User
  const handleDelete = async (id) => {
    try {
      const response = await axios.get(`http://localhost/cake-backend/api/deleteUser.php?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        toast.success('User deleted successfully!');
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  // Handle Inline Edit Save
  const handleSave = async (params) => {
    try {
      const response = await axios.get(`http://localhost/cake-backend/api/updateUser.php?id=${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.row),
      });
      if (response.ok) {
        toast.success('User updated successfully!');
        fetchUsers(); // Refresh users list
      } else {
        toast.error('Failed to update user');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'username',
      headerName: 'Full Name',
      width: 200,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'password',
      headerName: 'Password',
      width: 150,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          onClick={() => handleSave(params)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Management
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default UserTable;
