import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {Typography} from '@mui/material';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define colors for the chart

const UserCountyStats = () => {
    const [userCounty, setUserCounty] = useState('');

    //declaring static data for Demo
    const [countyStats, setCountyStats] = useState([
        { name: 'Nairobi', percentage: 65 },
        { name: 'Nakuru', percentage: 5 },
        { name: 'Kiambu', percentage: 10 },
        { name: 'Other', percentage: 20 },
    ]);

    useEffect(() => {
        // Fetch user's county
        axios.get('https://ipinfo.io?token=YOUR_ACCESS_TOKEN')
            .then(response => {
                const county = response.data.region;
                setUserCounty(county);
            })
            .catch(error => {
                console.error('Error fetching county data:', error);
            });

        // Fetch county statistics data
        axios.get('https://endpoint') // Replace with actual stats API
            .then(response => {
                setCountyStats(response.data); // Assumes API returns an array of county stats
            })
            .catch(error => {
                console.error('Error fetching county stats:', error);
            });
    }, []);

    return (
        <div style={{ textAlign: 'center', color: '#fff' }}>
      <Typography component="h2" variant="subtitle2">
         Users by county
     </Typography>
            <PieChart width={400} height={400}>
                <Pie
                    data={countyStats}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label={(entry) => `${entry.name}: ${entry.percentage}%`}
                >
                    {countyStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            {userCounty && (
                <p>You are in {userCounty} county</p>
            )}
        </div>
    );
};

export default UserCountyStats;
