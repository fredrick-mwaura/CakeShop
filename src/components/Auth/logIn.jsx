import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
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
import back from "../../images/login.jpg";

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

    try {
      const response = await fetch("http://localhost/cake-backend/api/Login.php", { //app.get
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        
      });

      const result = await response.json();
      setLoading(false);
      console.log(result)
      console.log(formData);

      if (response.ok) {//status 200
        login(result);
        toast.success("Successfully logged in!");
        console.log(result.Role);
        navigate(result.Role === "Admin" ? "/admin" : "/client/order"); //updated
      } else {
        setError(result.message || toast.error("Login failed, retry!"));
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(toast.error("An error occurred. Please try again."));
      console.error("Error:", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${back})`,
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
