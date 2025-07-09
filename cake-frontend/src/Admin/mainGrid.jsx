import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { LineChart, Tooltip, Line, ResponsiveContainer } from 'recharts';
import UserCountyStats from './usersLoc';
// import ClientList from './oftenClients';  

const data = [
  {
    title: 'Users',
    value: '1k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Orders',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Revenue',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ]
  }
];

function Analytics() {
  return (
   <>
    <Box display="flex" justifyContent="space-around" mb={2}>
      {/* <Typography component="h2" variant="h6" textAlign="center">
        Overview
      </Typography> */}
    </Box>    
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={3} p={2}>

      {data.map((item, index) => (
        <Stack
          key={index}
          component={Card}
          spacing={2}
          padding={2}
          sx={{
            borderLeft: `4px solid ${item.trend === 'up' ? '#4caf50' : item.trend === 'down' ? '#f44336' : '#616161'}`,
            backgroundColor: 'rgba(200, 200, 255, 0.8)',
            boxShadow: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" color="text.primary">
                {item.title}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                color={item.trend === 'up' ? '#4caf50' : item.trend === 'down' ? '#f44336' : 'text.primary'}
              >
                {item.trend === 'up' && <ArrowUpward fontSize="small" />}
                {item.trend === 'down' && <ArrowDownward fontSize="small" />}
                <Typography variant="h6" ml={0.5}>
                  {item.value}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {item.interval}
            </Typography>

            {/* Small line chart */}
            <Box mt={2} height={100}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.data.map((value, idx) => ({ name: idx, value }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={item.trend === 'up' ? '#4caf50' : item.trend === 'down' ? '#f44336' : '#9e9e9e'}
                    dot={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#444',  
                      borderRadius: '8px',      
                      padding: '5px',          
                      border: '1px solid #444'  
                    }}
                    wrapperStyle={{
                      outline: 'none',
                    }}
                    labelStyle={{
                      fontSize: '14px',         
                      fontWeight: 'bold',       
                      color: '#fff',           
                    }}
                  />

                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Stack>
      ))}
    </Box>
    <Box display="flex" justifyContent="space-around" mb={2}>
      <h3>client list</h3>
      {/* <ClientList/> */}
      <UserCountyStats />
      
    </Box>  
    </>
  );
}

export default Analytics;