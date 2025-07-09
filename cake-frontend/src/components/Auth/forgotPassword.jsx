import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to login if navigation state is invalid
    if (!location.state || !location.state.fromButton) {
      navigate("/client/login");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/cake-backend/api/ForgotPassword.php",
        { email },
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: (status) => status < 500,
        }
      );

      setLoading(false);

      if (response.status === 200 && response.data.success) {
        toast.success("Password reset email sent! Please check your inbox.");
      } else {
        toast.error(response.data.message || "Failed to send password reset email.");
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        toast.error("Server error. Please try again later.");
      } else if (err.request) {
        toast.error("Network error. Unable to connect to the server.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter your email address below, and we’ll send you a link to reset your password.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size="1rem" />}
            sx={{ mt: 2, py: 1.5 }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Remember your password?{" "}
          <Link href="/client/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
