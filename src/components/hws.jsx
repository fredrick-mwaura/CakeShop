import React from 'react';
import { Box, Button, Typography, Stack, useMediaQuery } from '@mui/material';
import cut from '../images/cut.webp';
import celebrate from '../images/celebrate.webp';
import cele from '../images/cele.webp';

const Hws = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #b7e1ff, #a0ebd5)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 2,
        }}
      >
        {/* Text Content */}
        <Box
          sx={{
            textAlign: 'center',
            marginRight: isSmallScreen ? 0 : '3%',
            flex: isSmallScreen ? '1 100%' : '0 1 45%',
            marginBottom: isSmallScreen ? 3 : 0,
          }}
        >
          <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>
            Welcome to Our Store
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#4a4a4a', marginBottom: '30px' }}>
            Explore our collection and find your favorite items.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#060230',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.4)',
              },
            }}
          >
            Shop Now
          </Button>
        </Box>

        {/* Image Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'center',
            gap: isSmallScreen ? '16px' : '32px',
            alignItems: 'center',
          }}
        >
          {/* Main Image */}
          <Box sx={{ position: 'relative' }}>
            <img
              src={celebrate}
              alt="Main"
              style={{
                width: '420px',
                height: '420px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>

          {/* Side Images */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              top: '10%',
              right: isSmallScreen ? 0 : '-10%',
            }}
          >
            <img
              src={cele}
              alt="Side Image 1"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
            <img
              src={cut}
              alt="Side Image 3"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hws;
