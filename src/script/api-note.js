const API_URL = "https://notes-api.dicoding.dev/v2/notes";

export const createNote = async (note) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Mapping 'content' menjadi 'body' sesuai dengan API
      body: JSON.stringify({ title: note.title, body: note.content }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
