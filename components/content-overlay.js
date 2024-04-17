const contentOverlayTemplate = document.createElement("template");
contentOverlayTemplate.innerHTML = `
<link rel="stylesheet" href="styles.css" />
<div class="overlay">
  <div class="modal">
    <div class="modal-content">
      <div class="close">x</div>
      <div class="markdown-content"><!-- Content will be loaded here --></div>
    </div>
  </div>
</div>
`;

class ContentOverlay extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(contentOverlayTemplate.content.cloneNode(true));
      this.shadowRoot.querySelector(".close").addEventListener("click", () => this.close());
      this.shadowRoot.querySelector(".overlay").addEventListener("click", () => this.close());
      this.shadowRoot.querySelector(".modal-content").addEventListener("click", event => event.stopPropagation());
      this.shadowRoot.querySelector(".modal-content").addEventListener("scroll", event => event.stopPropagation());
    }

    // connectedCallback() {
    //   src = this.getAttribute("src");
    // }

    loadContent(src) {
      // Clear the existing content
      this.shadowRoot.querySelector(".markdown-content").innerHTML = "";

      // Load Markdown content from the specified source
      fetch(src)
        .then(response => response.text())
        .then(text => {
          const converter = new showdown.Converter();
          this.shadowRoot.querySelector(".markdown-content").innerHTML = converter.makeHtml(text);
        })
        .catch(error => {
          console.error('Error loading content:', error);
        });
    }

    open() {
      this.loadContent(this.getAttribute("src"));

      this.shadowRoot.querySelector(".modal").style.display = "flex";
      this.shadowRoot.querySelector(".overlay").style.display = "block";
      this.style.display = "block";
    }

    close() {
      this.shadowRoot.querySelector(".markdown-content").innerHTML = "";
      this.shadowRoot.querySelector(".modal").style.display = "none";
      this.shadowRoot.querySelector(".overlay").style.display = "none";
      this.style.display = "none";
    }
  }

  export default ContentOverlay;