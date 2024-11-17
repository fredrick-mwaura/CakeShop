import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import WarningIcon from '@mui/icons-material/Warning';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newClient, setNewClient] = useState({ Username: '', email: '', Role: '' });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editClient, setEditClient] = useState({ LoginID: '', Username: '', email: '', Role: '' });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost/cake-backend/api/getUsers.php');
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          setClients(response.data.data);
        } else {
          setClients([]);
        }
      } catch (err) {
        setError('Failed to fetch clients.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = async () => {
    try {
      const response = await axios.post('http://localhost/cake-backend/api/addUser.php', newClient);
      if (response.data.status === 'success') {
        setClients([...clients, response.data.data]);
        setOpenAddDialog(false);
      } else {
        setError('Failed to add client.');
      }
    } catch (err) {
      setError('Failed to add client.');
    }
  };

  const handleEditClient = async () => {
    try {
      const response = await axios.put('http://localhost/cake-backend/api/UpdateUser.php', editClient);
      if (response.data.status === 'success') {
        const updatedClients = clients.map(client =>
          client.LoginID === editClient.LoginID ? editClient : client
        );
        setClients(updatedClients);
        setOpenEditDialog(false);
      } else {
        setError('Failed to update client.');
      }
    } catch (err) {
      setError('Failed to update client.');
    }
  };

  const handleDeleteClient = async (LoginID) => {
    try {
      const response = await axios.delete(`http://localhost/cake-backend/api/deleteUser.php?LoginID=${LoginID}`);
      if (response.data.status === 'success') {
        setClients(clients.filter(client => client.LoginID !== LoginID));
      } else {
        setError('Failed to delete client.');
      }
    } catch (err) {
      setError('Failed to delete client.');
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Signed Up Clients
      </Typography>
      {loading ? (
        <Typography>Loading clients...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
            Add Client
          </Button>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Login ID</strong></TableCell>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <TableRow key={client.LoginID}>
                      <TableCell>{client.LoginID}</TableCell>
                      <TableCell>{client.Username}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.Role}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setEditClient(client);
                            setOpenEditDialog(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteClient(client.LoginID)}
                          sx={{ ml: 1 }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        p={2}
                        bgcolor="#f9f9f9"
                        border="1px solid #ddd"
                        borderRadius="8px"
                      >
                        <WarningIcon color="warning" style={{ marginRight: '8px' }} />
                        <Typography variant="body1" color="textSecondary">
                          No clients found. Please check back later or ensure users are signed in.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add Client Dialog */}
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle>Add Client</DialogTitle>
            <DialogContent>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={newClient.Username}
                onChange={(e) => setNewClient({ ...newClient, Username: e.target.value })}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
              <TextField
                label="Role"
                fullWidth
                margin="normal"
                value={newClient.Role}
                onChange={(e) => setNewClient({ ...newClient, Role: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddClient} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Client Dialog */}
          <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogContent>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={editClient.Username}
                onChange={(e) => setEditClient({ ...editClient, Username: e.target.value })}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={editClient.email}
                onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
              />
              <TextField
                label="Role"
                fullWidth
                margin="normal"
                value={editClient.Role}
                onChange={(e) => setEditClient({ ...editClient, Role: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleEditClient} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default ClientList;
