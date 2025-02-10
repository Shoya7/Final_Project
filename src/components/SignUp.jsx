import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.some((user) => user.email === formData.email)) {
      setError("Email already registered");
      return;
    }

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      savedRaces: [],
      savedClasses: [],
    };

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    navigate("/dashboard");
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Create Account</h2>
        {error && <div className="dnd__error">{error}</div>}
        <input
          className="auth__input"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <button className="auth__button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
