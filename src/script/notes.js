import { fetchNotes } from "./api-get.js";
import { createNote, deleteNote } from "./api-note.js";
// Pastikan custom element LoadingIndicator sudah diimport agar didaftarkan
import "../script/loading-indicator.js";

// Ambil referensi ke custom element loading indicator
const loadingIndicator = document.querySelector("loading-indicator");

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

// Panggilan awal loadNotes
loadNotes();

// Optional: Auto refresh jika diperlukan
setInterval(loadNotes, 5000);
