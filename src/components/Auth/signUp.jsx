import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Images from '../image.jsx'
import Button from '@mui/material/Button'
import google from '../../images/google.svg'
import './signup.css';

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

    // Validate password length and confirm password matchs
    if(formData.password !== formData.confirmPassword){
      setErrorMessage(toast.error("Passwords do not match."));
    setLoading(false)
    }else

    setErrorMessage("");

    try {
      const response = await axios.post("/api/auth/signup", { //api call(promise based)
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setLoading(false);

      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/cookie");
        }, 2000);
      }else{
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
  };

  const handleUnsuccessfulRes = (response) => {
    if (response.status === 400) {
      toast.error("Bad Request: check your inputs.");
    } else if (response.status === 409) {
      toast.error("Email already exists");// conflict
    } else if (response.status === 500) {
      toast.error("please try again later."); // server error
    } else {
      toast.error("Unexpected error, Please contact admin")
    }
  }

  return (
      <div className="container">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} autoComplete="true">
          <div>
            <label>Full Name</label>
            <input
                type="text"
                name="username"
                placeholder="enter your name..."
                value={formData.username}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="enter your email.."
                value={formData.email}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="enter password"
                value={formData.password}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
          </div>
          <Button type="submit" className="submit" disabled={loading} color='secodary' variant='contained'>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <div>
          <a href='/' target="_blank" rel="noopener noreferrer" className='contGoogle'>
          <Images
            src={google}
            alt="google"
            width={15}
            height={15}
            className='icon'
          />continue with google</a>
          <p className="auth-footer">
            Have account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
  );
};
export default SignUp;