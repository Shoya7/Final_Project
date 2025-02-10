export const fetchRaceData = async (race) => {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/races/${race}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch race data: ${error.message}`);
  }
};
