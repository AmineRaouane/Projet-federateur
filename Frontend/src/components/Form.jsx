import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "./styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import Background from './Background.jpg';

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (method === "Register" && password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(route, { username, email, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        toast.success("Login successful");
        navigate("/"); // Redirect to home page after login

        // Notify header to update authorization state
        window.dispatchEvent(new Event('storage'));
      } else {
        toast.success("Registration successful, please login");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {method === "Register" && (
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        )}
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {method === "Register" && (
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        )}
        <div className="Loading">
          {loading && <LoadingIndicator />}
        </div>
        <button className="form-button py-2 px-10 bg-orange-700 text-white font-semibold uppercase mb-4 hover:bg-orange-900 duration-500" type="submit">
          {name}
        </button>
        <div className="form-text mt-3 text-center">
          {method === "login" ? (
            <Link
              to="/register"
              style={{ color: "orangered", textDecoration: "underline" }}
            >
              Don't have an account? Register
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ color: "orangered", textDecoration: "underline" }}
            >
              Already have an account? Login
            </Link>
          )}
        </div>
      </form>
      <div style={{ 
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        width: '65%',
        borderRadius: '0px 8px 8px 0px'
      }}>
      </div>
    </div>
  );
}

export default Form;
