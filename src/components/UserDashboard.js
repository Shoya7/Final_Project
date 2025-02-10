import React, { useState, useEffect, useCallback } from "react";
import RaceCard from "./RaceCard";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [savedRaces, setSavedRaces] = useState([]);
  const [availableRaces, setAvailableRaces] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const loadSavedRaces = useCallback(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserData = users.find(
      (user) => user.email === currentUser.email
    );
    setSavedRaces(currentUserData?.savedRaces || []);
  }, [currentUser.email]);

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
  }, [loadSavedRaces]);

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
    <div className="dashboard">
      <h1 className="dashboard__title">Welcome, {currentUser.username}!</h1>

      <section className="dashboard__section dashboard__saved">
        <h2 className="dashboard__title">Your Saved Races</h2>
        <div className="dashboard__grid">
          {savedRaces.map((race) => (
            <div key={race.index} className="dashboard__card">
              <RaceCard race={race} saved={true} />
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__title">Available Races</h2>
        <div className="dashboard__grid">
          {availableRaces.map((race) => (
            <div key={race.index} className="dashboard__card">
              <RaceCard race={race} />
              <button
                className={`dashboard__button ${
                  savedRaces.some((saved) => saved.index === race.index)
                    ? "dashboard__button--disabled"
                    : ""
                }`}
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
