const BASE_URL = "https://www.dnd5eapi.co/api";

const API_KEY = process.env.REACT_APP_RACE_API_KEY;

export const getRaces = async () => {
  try {
    const response = await fetch(`${BASE_URL}/races`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    if (!response.ok) throw new Error("API request failed");
    return await response.json();
  } catch (error) {
    throw new Error(
      "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
    );
  }
};
