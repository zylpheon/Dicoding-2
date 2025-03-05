class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          form {
            display: grid;
            gap: 10px;
            background-color: #111;
            padding: 20px;
            border-radius: 8px;
          }
          input, textarea {
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #222;
            color: #fff;
          }
          button {
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
        <form id="note-form">
          <input type="text" name="title" placeholder="Note Title" required />
          <textarea name="content" placeholder="Note Content" required></textarea>
          <button type="submit">Add Note</button>
        </form>
      `;

    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.shadowRoot.querySelector("input[name='title']").value;
      const content = this.shadowRoot.querySelector(
        "textarea[name='content']"
      ).value;
      // Dispatch event 'submitnote' dengan detail data note
      this.dispatchEvent(
        new CustomEvent("submitnote", {
          detail: { title, content },
          bubbles: true,
          composed: true,
        })
      );
      e.target.reset();
    });
  }
}

customElements.define("note-form", NoteForm);
