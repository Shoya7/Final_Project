import { useState, useEffect } from "react";
import { getRaces } from "../utils/RaceApi";

const RaceList = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetchRaces();
  }, []);

  const fetchRaces = async () => {
    try {
      setLoading(true);
      const data = await getRaces();
      setRaces(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (loading) return <div className="loading">Loading races...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!races.length) return <div className="error">Nothing found</div>;

  return (
    <div className="race-cards page-transition">
      {races.slice(0, visibleCount).map((race) => (
        <RaceCard key={race.id} race={race} />
      ))}
      {visibleCount < races.length && (
        <button className="nav-button" onClick={showMore}>
          Show More
        </button>
      )}
    </div>
  );
};
