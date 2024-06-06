import { useState } from "react";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom
import form_bg from "/images/reg-form-bg.jpg";
import { FaCheckCircle } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  // State Management for user data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // State Management for Error
  const [errorMessage, setErrorMessage] = useState({
    emailError: "",
    passwordError: "",
  });

  const [messageActive, setMessageActive] = useState(false);

  // Handle Change / handle Input Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = userData;

    let hasError = false;

    // Email validation
    if (email.trim() === "") {
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        emailError: "Email is required",
      }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        emailError: "Invalid email address",
      }));
      hasError = true;
    } else {
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        emailError: "",
      }));
    }

    // Password validation
    if (password.trim() === "") {
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        passwordError: "Password is required",
      }));
      hasError = true;
    } else {
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        passwordError: "",
      }));
    }

    if (!hasError) {
      console.log(userData);
      setMessageActive(true);
      setUserData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="register-form-wrapper">
      {/* Main Section */}
      <section className="registration-form-section center">
        <div className="container">
          {/* Side Image */}
          <div className="form-side-image">
            <img src={form_bg} alt="" />
          </div>

          {/* Registration Form */}
          <div className="registration-form-container">
            <div className="form-title mt-5" style={{ color: "orangered" }}>
              <h4 className="text-2xl font-bold text-center pt-4">
                LOG IN
              </h4>
            </div>
            <form action="" onSubmit={handleSubmit} id="register-form">
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={userData.email}
                />
                <span className="error-message">{errorMessage.emailError}</span>
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter password"
                  onChange={handleChange}
                  value={userData.password}
                />
                <span className="error-message">{errorMessage.passwordError}</span>
              </div>

              {/* Login Button */}
              <div className="form-btn mx-4 mt-3">
                <input type="submit" id="register-btn" value="Log in" />
              </div>

              {/* Text for new users with Link */}
              <div className="form-text mt-3 text-center">
                <Link to="/Register2" style={{ color: "orangered", textDecoration: "underline" }}>
                  Don't have an account ? Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Success Message Prompt */}
      <section
        className={`success-message center ${messageActive ? "msg-active" : ""}`}
      >
        <div className="container center flex-col p-4">
          <div className="icon">
            <FaCheckCircle />
          </div>
          <div className="text">
            <p className="msg text-center text-white text-2xl">
              Congratulations! You are Now A Member of Flex Fit Gym Family
            </p>
          </div>
          <div className="close-btn">
            <button
              onClick={() => {
                setMessageActive(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
