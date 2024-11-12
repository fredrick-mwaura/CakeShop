import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Images from "../image.jsx";
import google from "../../images/google.svg";
import back from '../../images/login.jpg'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate password length and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(toast.error("Passwords do not match."));
      setLoading(false);
    } else {
      setErrorMessage("");

      try {
        const response = await axios.post("http://localhost/cake-backend/api/signup.php", { 
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        setLoading(false);

        if (response.status === 201) {
          localStorage.setItem("user", JSON.stringify(response.data));
          toast.success("Signup successful!");
          setTimeout(() => {
            navigate("/client/cookie");
          }, 2000);
        } else {
          handleUnsuccessfulRes(response);
        }
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    }
  };

  const handleUnsuccessfulRes = (response) => {
    if (response.status === 400) {
      toast.error("Bad Request: check your inputs.");
    } else if (response.status === 409) {
      toast.error("Email already exists");
    } else if (response.status === 500) {
      toast.error("Please try again later.");
    } else {
      toast.error("Unexpected error, please contact admin");
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", backgroundImage: `url(${back})`, backgroundSize: "cover",
    backgroundPosition: "center", width:"100%", backgroundRepeat: "no-repeat", alignItems: "center", minHeight: "100vh" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          margin: "auto",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Sign Up
        </Typography>
        {/* {errorMessage && (
          <Typography color="error" variant="body2" align="center">
            {errorMessage}
          </Typography>
        )} */}
        <form onSubmit={handleSubmit} autoComplete="true">
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </Stack>
        </form>
        <Box mt={2} display="flex" alignItems="center" justifyContent="center">
          <Images src={google} alt="google" width={15} height={15} />
          <Link href="/" target="_blank" rel="noopener" sx={{ ml: 1 }}>
            Continue with Google
          </Link>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/client/login" color="primary">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
      {/* <Outlet/> */}
    </Container>
  );
};

export default SignUp;