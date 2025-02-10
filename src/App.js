import React, { useState, useEffect } from "react";
import RaceCard from "./components/RaceCard";
import "./App.css";
import { fetchRaceData } from "./services/api";

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
          raceList.map((race) => fetchRaceData(race))
        ).catch((error) => {
          console.error("Error fetching races:", error);
          setRaces([]);
        });
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
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        D&D Races
      </Link>
      <div className="navbar__links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="navbar__button">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="navbar__button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__button">
              Login
            </Link>
            <Link to="/signup" className="navbar__button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );

  const MainComponent = () => (
    <div className="dnd">
      <h1 className="dnd__title">Races of the Realm</h1>
      <div className="races">
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
        <Route
          path="/login"
          element={
            <Login setIsAuthenticated={setIsAuthenticated} races={races} />
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
