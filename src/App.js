import React, { useState, useEffect } from "react";
import RaceCard from "./components/RaceCard";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [races, setRaces] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("currentUser")
  );

  useEffect(() => {
    const fetchRaces = async () => {
      const raceList = [
        "dwarf",
        "elf",
        "halfling",
        "human",
        "dragonborn",
        "gnome",
        "half-elf",
        "half-orc",
        "tiefling",
      ];

      try {
        const raceData = await Promise.all(
          raceList.map(async (race) => {
            const response = await fetch(
              `https://www.dnd5eapi.co/api/races/${race}`
            );
            return response.json();
          })
        );
        setRaces(raceData);
      } catch (error) {
        console.log("Error fetching races:", error);
      }
    };

    fetchRaces();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
  };

  const NavBar = () => (
    <nav className="nav-bar">
      <Link to="/" className="nav-brand">
        D&D Races
      </Link>

      {/* <div className="nav-brand">D&D Races</div> */}
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-button">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button">
              Login
            </Link>
            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );

  const MainComponent = () => (
    <div className="dnd-container">
      <h1 className="title">Races of the Realm</h1>
      <div className="race-cards">
        {races.map((race) => (
          <RaceCard
            key={race.index}
            race={race}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/signup"
          element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        /> */}
        // In your routes section, update the Login route:
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              races={races} // Pass races data to Login component
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
