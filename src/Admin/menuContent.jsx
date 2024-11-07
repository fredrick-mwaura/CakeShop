import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import logo from '/vite.svg';
import { useNavigate } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, link: '/'},
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, link: '/analytics'},
  { text: 'Clients', icon: <PeopleRoundedIcon />, link: '/users' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, link: '/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, link: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, link: '/feedback' },
];


export default function MenuContent() {

const navigate = useNavigate();
const logoClick = () => {
  navigate('/admin');
};

  return (
    <>
    <img src={logo} alt="Logo" style={{ width: '100%', height: '200px', cursor:'pointer'}} onClick={logoClick} />
    
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-evenly' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
    </>
  );
}
