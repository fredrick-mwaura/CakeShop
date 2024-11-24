import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Images from "../image.jsx";
import google from "../../images/google.svg";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  IconButton,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [formData, setFormData] = useState({username: "", email: "", Role: "", password: "", confirmPassword: ""});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic Validation: Check if all fields are filled
    if (
      !formData.username ||
      !formData.email ||
      !formData.Role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    // Validate password length and confirm password match
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
       " http://localhost/cake-backend/api/signup.php",
        {
          formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            validateStatus: (status) => status < 500,
          },
           withCredentials: true,
        }
      );

      setLoading(false);
      console.log("Full response:", response);

      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/client/confirm_email");
        }, 2000);
      } else {
        handleUnsuccessfulRes(response);
      }
    } catch (err) {
      setLoading(false);

      handleUnsuccessfulRes(err.response || { status: 500 });
    }
  };

  const handleUnsuccessfulRes = (response) => {
    if (response.status === 400) {
      toast.error("Bad Request: Check your inputs.");
    } else if (response.status === 409) {
      toast.error("Email already exists.");
    } else if (response.status === 500) {
      toast.error("Server error. Please try again later.");
    } else {
      toast.error("Unexpected error, please contact admin.");
      console.log(response.status);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
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
        <form onSubmit={handleSubmit} autoComplete="true">
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              type="text"
              value={formData.username || ""}
              onChange={handleChange}
              required
              inputProps={{ "aria-label": "username" }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              // inputProps={{ "aria-label": "email" }}
            />
            <FormControl fullWidth required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="Role"
                value={formData.Role || ""}
                onChange={handleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ position: "relative", mb: 2 }}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
            />
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handlePasswordToggle}
              sx={{ position: "absolute", right: 8, top: 12 }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
            <Box sx={{ position: "relative", mb: 1 }}>
            <TextField
              label="confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handlePasswordToggle}
              sx={{ position: "absolute", right: 8, top: 12 }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
            {loading && (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
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
    </Container>
  );
};

export default SignUp;
