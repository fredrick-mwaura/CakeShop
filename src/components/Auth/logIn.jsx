import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import back from "../../images/login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ Username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset any previous error
  
    try {
      // Using axios to make the POST request
      const response = await axios.post(
        "http://localhost/cake-backend/api/Login.php",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: (status) => status < 500, // Accept all responses with status < 500
        }
      );
  
      setLoading(false);

    console.log("Full response:", response);
  
      // Handle successful login
      if (response.status === 200 && response.data.success) {
        const result = response.data;
        login(result);
        toast.success("Successfully logged in!");
        console.log(result.role);
        navigate(result.role === "Admin" ? "/admin" : "/client/order");
        return;
      }
  
      // Handle specific error cases based on backend response
      if (response.status === 401 || response.data.message === "Incorrect password") {
        toast.warn("Incorrect password!");
      } else if (response.status === 404 || response.data.message === "User not found") {
        toast.warn("User does not exist!");
      } else if (response.status === 422) {
        toast.warn("Missing username or password.");
      } else {
        // Handle other error cases with response message
        setError(response.data.message || "Login failed, please retry!");
        toast.error(response.data.message || "Login failed, please retry!");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error:", err);
  
      // Handle network errors or unexpected issues
      if (err.response) {
        switch (err.response.status) {
          case 500:
            toast.error("Server error, please try again later.");
            break;
          default:
            toast.error("An unexpected error occurred. Please try again.");
        }
      } else if (err.request) {
        // Network error (e.g., server not reachable)
        toast.error("Unable to connect to the server. Please check your network.");
      } else {
        // Other errors (e.g., coding issues)
        toast.error("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        // backgroundImage: `url(${back})`,
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
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Username"
            name="Username"
            type="text"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.Username}
            onChange={handleChange}
          />
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size="1rem" />}
            sx={{ mt: 2 }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account? <a href="/client/signup">Sign Up</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
