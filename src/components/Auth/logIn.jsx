
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
// import Navbar from "../Header";
import "./login.css";
import {toast} from "react-hot-toast";

const Login = () => {

  const [formData, setFormData] = useState({ username: "", password: "" });
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    // validate inputs
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setLoading(false);

      if (response.status === 200) {
        login(result);
        toast.success("successfully logged in!")
        navigate(result.role === "admin" ? "/admin/dashboard" : "/dashboard");
      } else {
        setError(result.message || toast.error( "Login failed"));
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setLoading(false);
      setError(toast.error("An error occurred. Please try again."));
    }
  };

  return (
    <>
      {/*<Navbar />*/}
      <div className="auth-container">
        <h2 className="auth-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit} name="login" id="login" autoComplete="true">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="username"
                value={formData.email}
                onChange={handleChange}
                required
            />
          </div>
          <div className="input-container">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button
                type="button"
                className="toggle-password"
                onClick={handlePasswordToggle}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                    <path d="M1 12s2-6 11-6 11 6 11 6-2 6-11 6-11-6-11-6z"/>
                    <path d="M12 12l-6 6"/>
                  </svg>
              ) : (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                    <path d="M17 18.5L12 12 7 18.5"/>
                    <path d="M12 2C6 2 2 12 2 12s4 10 10 10 10-10 10-10-4-10-10-10z"/>
                  </svg>
              )}
            </button>
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="auth-footer">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
