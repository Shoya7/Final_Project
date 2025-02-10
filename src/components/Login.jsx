import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = ({ setIsAuthenticated, races }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsAuthenticated(true);
      navigate("/dashboard", {
        state: { races },
        replace: true,
      });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Welcome Back</h2>
        {error && <div className="auth__error">{error}</div>}
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button className="auth__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
