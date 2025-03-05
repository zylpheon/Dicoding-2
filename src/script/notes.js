import { fetchNotes } from "./api-get.js";
import { createNote, deleteNote } from "./api-note.js";

// Pastikan custom element sudah didaftarkan
// Di file src/script/notes.js atau file entry point yang Anda gunakan
import "./loading-indicator.js";
import "./note-card.js";
import "./note-form.js";
import "./app-footer.js"; // Import komponen footer

const loadingIndicator = document.querySelector("loading-indicator");
const notesContainer = document.getElementById("notes-container");

// Render catatan menggunakan custom element note-card
const renderNotes = (notes) => {
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteCard = document.createElement("note-card");
    noteCard.setAttribute("title", note.title);
    noteCard.setAttribute("body", note.body);
    noteCard.setAttribute("id", note.id);
    notesContainer.appendChild(noteCard);
  });
};

const loadNotes = async () => {
  loadingIndicator.show();
  const notes = await fetchNotes();
  renderNotes(notes);
  loadingIndicator.hide();
};

// Event listener untuk custom event 'submitnote' dari note-form
document.addEventListener("submitnote", async (e) => {
  loadingIndicator.show();
  await createNote({ title: e.detail.title, content: e.detail.content });
  loadNotes();
  loadingIndicator.hide();
});

// Event listener untuk custom event 'delete' yang di-dispatch oleh note-card
document.addEventListener("delete", async (e) => {
  loadingIndicator.show();
  await deleteNote(e.detail);
  loadNotes();
  loadingIndicator.hide();
});

loadNotes();

// Auto-refresh notes setiap 5 detik
setInterval(loadNotes, 5000);
