class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const body = this.getAttribute("body") || "";
    const id = this.getAttribute("id") || "";
    this.shadowRoot.innerHTML = `
        <style>
          .note {
            background-color: #111;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .note h3 {
            margin-bottom: 10px;
            color: #007bff;
          }
          .note p {
            margin-bottom: 15px;
          }
          .note button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .note button:hover {
            background-color: #0056b3;
          }
          .note:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
          }
        </style>
        <div class="note">
          <h3>${title}</h3>
          <p>${body}</p>
          <button id="delete-btn">Delete</button>
        </div>
      `;

    this.shadowRoot
      .querySelector("#delete-btn")
      .addEventListener("click", () => {
        // Dispatch event untuk menghapus catatan, mengirim id catatan
        this.dispatchEvent(
          new CustomEvent("delete", {
            detail: id,
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define("note-card", NoteCard);
