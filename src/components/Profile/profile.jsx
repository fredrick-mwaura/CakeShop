import React, { useState, useEffect } from "react";
import { Box, Button, Container, TextField, Typography, Avatar, CircularProgress, Paper, Stack } from "@mui/material";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost/cake-backend/api/GetProfile.php", {
        headers: { "Content-Type": "application/json", withCredentials: true },
      });
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching profile:", err);
    }
  };

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

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", profile.Username);
      formData.append("email", profile.email);
      formData.append("existingProfilePicture", profile.profilePicture);
      if (selectedFile) formData.append("profilePicture", selectedFile);
      const response = await axios.post("http://localhost/cake-backend/api/UpdateProfile.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setEditMode(false);
        fetchProfile();
      }
    } catch (err) {
      setLoading(false);
      console.error("Error updating profile:", err);
    }
  };

  const toggleEditMode = () => setEditMode(!editMode);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, md: 4 }, backgroundColor: "#fff", borderRadius: 4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main">Profile Settings</Typography>
      </Box>

      {/* Profile Section */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ mb: 4 }}>
        {/* Personal Information */}
        <Paper sx={{ p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", flex: 1 }}>
          <Typography variant="h6" mb={2} fontWeight="bold" color="text.primary">Personal Information</Typography>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar
              src={profile.profilePicture ? `http://localhost/cake-backend/uploads/${profile.profilePicture}` : null}
              sx={{ width: 100, height: 100, fontSize: "2rem", backgroundColor: "primary.main" }}
            >
              {!profile.profilePicture && profile.Username.charAt(0).toUpperCase()}
            </Avatar>
            <input accept="image/*" style={{ display: "none" }} id="upload-profile-picture" type="file" onChange={handleFileChange} />
            <label htmlFor="upload-profile-picture">
              <Button variant="outlined" color="primary" component="span">Change Picture</Button>
            </label>
          </Box>
          <TextField
            fullWidth
            disabled={!editMode}
            value={profile.Username}
            name="Username"
            onChange={handleChange}
            label="Username"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            disabled={!editMode}
            value={profile.email}
            name="email"
            onChange={handleChange}
            label="Email"
            variant="outlined"
            margin="normal"
          />
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Button variant="contained" color="primary" onClick={editMode ? handleUpdate : toggleEditMode} sx={{ mt: 2 }}>
              {editMode ? "Save Changes" : "Edit Profile"}
            </Button>
          )}
        </Paper>

        {/* Password Section */}
        <Paper sx={{ p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", flex: 1 }}>
          <Typography variant="h6" mb={2} fontWeight="bold" color="text.primary">Change Password</Typography>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            variant="outlined"
            margin="normal"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            variant="outlined"
            margin="normal"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            variant="outlined"
            margin="normal"
            name="confirmNewPassword"
            value={passwords.confirmNewPassword}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Update Password</Button>
        </Paper>
      </Stack>

      {/* Social Media Section */}
      <Paper sx={{ p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
        <Typography variant="h6" mb={2} fontWeight="bold" color="text.primary">Social Media</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button startIcon={<FaFacebook />} variant="contained" color="primary">Facebook</Button>
          <Button startIcon={<FaInstagram />} variant="contained" color="secondary">Instagram</Button>
          <Button startIcon={<FaTelegram />} variant="contained" color="info">Telegram</Button>
          <Button startIcon={<FaWhatsapp />} variant="contained" color="success">WhatsApp</Button>
          <Button startIcon={<FaLinkedin />} variant="contained" color="primary">LinkedIn</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
