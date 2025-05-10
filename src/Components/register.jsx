import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.email || !formData.password || !formData.username) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed.");
      }
    } catch (error) {
      setError(`Registration error: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registration-auth">
        <div className="registration-container">
          <h2>User Registration</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="registration-input-group">
              <div>
                <div className="registration-text-area">
                  <label>Name: </label>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="registration-text-area">
                  <label>Email Id:</label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="registration-text-area">
              <label>Password:</label>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <span className="registration-error-msg">{error}</span>}
            <div className="registration-btn1">
              <button type="submit">Register</button>
            </div>
          </form>
          <span>
            Already have an account? login
            <Link to="/login"> Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
