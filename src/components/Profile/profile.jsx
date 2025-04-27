import React, { useState, useEffect } from "react";
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
    setError(null);
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
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
            Profile Settings
          </h2>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                {profile.profilePicture ? (
                  <img 
                    src={`http://localhost/cake-backend/uploads/${profile.profilePicture}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                    {profile.Username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <input
                accept="image/*"
                className="hidden"
                id="upload-profile-picture"
                type="file"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="upload-profile-picture"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
              >
                Change Picture
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  disabled={!editMode}
                  value={user?.username || ""}
                  name="Username"
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editMode ? 'bg-gray-100' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  disabled={!editMode}
                  value={email?.email || ""}
                  name="email"
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editMode ? 'bg-gray-100' : 'bg-white'}`}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center mt-4">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                onClick={editMode ? handleUpdate : toggleEditMode}
                className={`mt-4 px-6 py-2 rounded-lg font-medium ${editMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition-colors`}
              >
                {editMode ? "Save Changes" : "Edit Profile"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;