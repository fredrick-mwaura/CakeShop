import {useNavigate} from 'react-router-dom'
import {Avatar, Container, Paper, Box, Typography, TextField, Button } from '@mui/material'
import { LockClockOutlined } from '@mui/icons-material'

const SignIn = ()=>{
   const navigate = useNavigate();

   const handleSubmit = (e)=>{
      e.preventDefault()
      navigate('/')
   }
   return(
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{
         //  padding: '20px',
         //  marginTop: '100px',
         //  display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        }}>
           <Avatar
           sx={{
              margin: '10px',
              bgcolor: 'secondary.main',
              textAlign: 'center',
              color: 'white',
              width: '50px',
              height: '50px',
              mx: 'auto',
            }}
           >
              <LockClockOutlined/>               
           </Avatar>
           <Typography variant='h5' component="h2"  sx={
            {
              fontWeight: 'bold',
              fontSize: '24px',
              marginBottom: '20px',
              textAlign: 'center',
            }
           }>
            Sign In
           </Typography>
           <Box component="form" onSubmit={handleSubmit} noValidate sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
           }}> 
            <TextField 
            id="email" 
            label="email" 
            variant="filled" 
            placeholder='enter email'
            autofocus 
            sx={{
               width: '60%',
              mb: '30px',
            }}/>
            <TextField 
            id="password" 
            label="password" 
            variant="filled"
            placeholder='enter password'
            sx={{
               width: '60%',
               mb: '30px',
            }} />

            <Button variant='contained' color='primary' type='submit'>
               Sign In
            </Button>
           </Box>
        </Paper>
      </Container>

   )
}
export default SignIn;

