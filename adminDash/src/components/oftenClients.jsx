import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import axios from 'axios'; 

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/clients'); // API call (replace)
        setClients(response.data); 
      } catch (err) {
        setError('Failed to fetch clients.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchClients(); 
  }, []);

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
        <List dense>
          {clients.length > 0 ? (
            clients.map(client => (
              <ListItem key={client.id}>
                <ListItemText
                  primary={client.name}
                  secondary={`Last Visit: ${client.lastVisit}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No clients found." />
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

export default ClientList;
