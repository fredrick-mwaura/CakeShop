import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    Username: "",
    email: "",
    profilePicture: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost/cake-backend/api/getUsers.php", {
        headers: { "Content-Type": "application/json", withCredentials: true },
      });
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load profile. Please try again.");
      console.error("Error fetching profile:", err);
    }
  };

  // Update profile information
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("username", profile.Username);
      formData.append("email", profile.email);
      formData.append("existingProfilePicture", profile.profilePicture);
      if (selectedFile) formData.append("profilePicture", selectedFile);

      const response = await axios.post("http://localhost/cake-backend/api/UpdateUser.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setEditMode(false);
        fetchProfile();
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setError("Error updating profile. Please check your input.");
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setError(null); // Clear any errors when toggling modes
  };

  useEffect(() => {
    fetchProfile();
  }, []);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    useEffect(() => {
      const S_email = localStorage.getItem('user');
      if(S_email){
        setEmail(JSON.parse(S_email));
      }
    }, [])

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        px: { xs: 2, md: 4 },
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          Profile Settings
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Profile Section */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ mb: 4 }}>
        {/* Personal Information */}
        <Paper
          sx={{
            p: 3,
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            flex: 1,
          }}
        >
          <Typography variant="h6" mb={2} fontWeight="bold" color="text.primary">
            Personal Information
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar
              src={
                profile.profilePicture
                  ? `http://localhost/cake-backend/uploads/${profile.profilePicture}`
                  : null
              }
              sx={{
                width: 100,
                height: 100,
                fontSize: "2rem",
                backgroundColor: "primary.main",
              }}
            >
              {!profile.profilePicture && profile.Username.charAt(0).toUpperCase()}
            </Avatar>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-profile-picture"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-profile-picture">
              <Button variant="outlined" color="primary" component="span">
                Change Picture
              </Button>
            </label>
          </Box>
          <TextField
            fullWidth
            disabled={!editMode}
            value={user.username}
            name="Username"
            onChange={handleChange}
            label="Username"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            disabled={!editMode}
            value={email.email || ""}
            name="email"
            onChange={handleChange}
            label="Email"
            variant="outlined"
            margin="normal"
          />
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={editMode ? handleUpdate : toggleEditMode}
              sx={{ mt: 2 }}
            >
              {editMode ? "Save Changes" : "Edit Profile"}
            </Button>
          )}
        </Paper>
      </Stack>
    </Container>
  );
};

export default Profile;
