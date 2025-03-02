const API_URL = "https://notes-api.dicoding.dev/v2/notes";

export const fetchNotes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const result = await response.json();
    return result.data; // Mengembalikan array notes dari properti 'data'
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};
