import React, { useState, useEffect } from "react";
import RaceCard from "./RaceCard";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [savedRaces, setSavedRaces] = useState([]);
  const [availableRaces, setAvailableRaces] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    // Fetch available races
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

      const raceData = await Promise.all(
        raceList.map(async (race) => {
          const response = await fetch(
            `https://www.dnd5eapi.co/api/races/${race}`
          );
          return response.json();
        })
      );
      setAvailableRaces(raceData);
    };

    fetchRaces();
    loadSavedRaces();
  }, []);

  const loadSavedRaces = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserData = users.find(
      (user) => user.email === currentUser.email
    );
    setSavedRaces(currentUserData?.savedRaces || []);
  };

  const handleSaveRace = (race) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(
      (user) => user.email === currentUser.email
    );

    if (userIndex !== -1) {
      if (!users[userIndex].savedRaces) {
        users[userIndex].savedRaces = [];
      }
      users[userIndex].savedRaces.push(race);
      localStorage.setItem("users", JSON.stringify(users));
      setSavedRaces([...savedRaces, race]);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {currentUser.username}!</h1>

      <section className="saved-races">
        <h2>Your Saved Races</h2>
        <div className="race-grid">
          {savedRaces.map((race) => (
            <RaceCard key={race.index} race={race} saved={true} />
          ))}
        </div>
      </section>

      <section className="available-races">
        <h2>Available Races</h2>
        <div className="race-grid">
          {availableRaces.map((race) => (
            <div key={race.index} className="race-card-container">
              <RaceCard race={race} />
              <button
                className="save-button"
                onClick={() => handleSaveRace(race)}
                disabled={savedRaces.some(
                  (saved) => saved.index === race.index
                )}
              >
                {savedRaces.some((saved) => saved.index === race.index)
                  ? "Saved"
                  : "Save Race"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
