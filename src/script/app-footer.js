class AppFooter extends HTMLElement {
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
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #111;
          padding: 15px 20px;
          text-align: center;
          color: #fff;
          font-size: 0.9rem;
          z-index: 100;
        }
        p {
          margin: 0;
        }
      </style>
      <p>&copy; 2025 by Valentino</p>
    `;
  }
}

customElements.define("app-footer", AppFooter);
