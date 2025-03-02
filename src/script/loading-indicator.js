class LoadingIndicator {
  constructor() {
    this.overlay = document.createElement("div");
    this.overlay.className = "loading-overlay";
    this.spinner = document.createElement("div");
    this.spinner.className = "loading-spinner";
    this.overlay.appendChild(this.spinner);
    document.body.appendChild(this.overlay);
  }

  show() {
    this.overlay.style.display = "flex";
  }

  hide() {
    this.overlay.style.display = "none";
  }
}

export default LoadingIndicator;
