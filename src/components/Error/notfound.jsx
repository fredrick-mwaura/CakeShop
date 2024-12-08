import React, { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const ErrorContainer = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: 500,
  width: '90%',
}));

const ErrorIllustration = styled('svg')(({ theme }) => ({
  width: 300,
  height: 300,
  marginBottom: theme.spacing(4),
}));

const NotFound = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const navigate = useNavigate();
  
  const Home = ()=>{
    navigate('/')
  }

  return (
    <Box
      sx={{
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f8fafc',
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <ErrorContainer data-aos="fade-up">
        <ErrorIllustration viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="250" r="200" fill="#f1f5f9" />
          <path
            d="M196 155c-15-10-35 5-30 20l40 150c2 8 8 15 16 17 8 3 17 0 23-7l110-140c12-15-3-35-20-30l-139 40z"
            fill="#1e293b"
          />
          <circle cx="320" cy="230" r="20" fill="#cbd5e1" />
          <circle cx="180" cy="270" r="20" fill="#cbd5e1" />
          <path
            d="M220 320c30 20 60 20 90 0"
            stroke="#cbd5e1"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </ErrorIllustration>
        <Typography variant="h1" sx={{ fontSize: '3rem', color: '#1e293b', mb: 1 }}>
          Oops!
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.2rem', mb: 3 }}>
          The page you're looking for seems to have wandered off. Let's get you back on track!
        </Typography>
        <Button
          onclick={Home}
          variant="contained"
          sx={{
            backgroundColor: '#1e293b',
            color: 'white',
            padding: '10px 20px',
            borderRadius: 2,
            fontSize: '1.1rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#334155',
            },
          }}
        >
          Back to home
        </Button>
      </ErrorContainer>
    </Box>
  );
};

export default NotFound;
