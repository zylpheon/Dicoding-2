import { fetchNotes } from "./api-get.js";
import { createNote, deleteNote } from "./api-note.js";
import LoadingIndicator from "./loading-indicator.js";

const loadingIndicator = new LoadingIndicator();

const renderNotes = (notes) => {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button onclick="deleteNoteHandler('${note.id}')">Delete</button>
    `;
    notesContainer.appendChild(noteElement);
  });
};

const deleteNoteHandler = async (id) => {
  loadingIndicator.show();
  await deleteNote(id);
  loadNotes();
  loadingIndicator.hide();
};

// Agar deleteNoteHandler dapat dipanggil dari HTML
window.deleteNoteHandler = deleteNoteHandler;

const loadNotes = async () => {
  // Menampilkan indikator loading
  loadingIndicator.show();
  const notes = await fetchNotes();
  renderNotes(notes);
  loadingIndicator.hide();
};

document
  .getElementById("note-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    loadingIndicator.show();
    await createNote({ title, content });
    loadNotes();
    loadingIndicator.hide();
  });

// Pemanggilan awal untuk loadNotes
loadNotes();

// Auto refresh: Memanggil loadNotes setiap 2 detik untuk mendapatkan catatan terbaru
setInterval(() => {
  loadNotes();
}, 2000);
