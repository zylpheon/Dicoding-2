class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const overlay = document.createElement("div");
    overlay.classList.add("loading-overlay");

    const spinner = document.createElement("div");
    spinner.classList.add("loading-spinner");

    overlay.appendChild(spinner);
    this.shadowRoot.appendChild(overlay);

    const style = document.createElement("style");
    style.textContent = `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
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
    this._overlay = overlay;
  }

  show() {
    this._overlay.style.display = "flex";
  }

  hide() {
    this._overlay.style.display = "none";
  }
}

customElements.define("loading-indicator", LoadingIndicator);
