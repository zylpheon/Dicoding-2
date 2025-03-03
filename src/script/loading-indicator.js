class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    // Membuat shadow DOM
    this.attachShadow({ mode: "open" });

    // Buat wrapper overlay
    const overlay = document.createElement("div");
    overlay.classList.add("loading-overlay");

    // Buat spinner
    const spinner = document.createElement("div");
    spinner.classList.add("loading-spinner");

    // Gabungkan elemen
    overlay.appendChild(spinner);
    this.shadowRoot.appendChild(overlay);

    // Tambahkan styling untuk loading indicator
    const style = document.createElement("style");
    style.textContent = `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none; /* tersembunyi secara default */
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
      }
      .loading-spinner {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #3498db;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    this.shadowRoot.appendChild(style);

    // Simpan referensi overlay untuk kemudahan akses
    this._overlay = overlay;
  }

  // Method untuk menampilkan loading indicator
  show() {
    this._overlay.style.display = "flex";
  }

  // Method untuk menyembunyikan loading indicator
  hide() {
    this._overlay.style.display = "none";
  }
}

// Daftarkan custom element dengan nama 'loading-indicator'
customElements.define("loading-indicator", LoadingIndicator);
