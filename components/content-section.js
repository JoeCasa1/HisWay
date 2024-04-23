const contectSectionTemplate = document.createElement('template');
contectSectionTemplate.innerHTML = `
    <link rel="stylesheet" href="styles.css" />
    <section></section>
`;

class ContentSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(contectSectionTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('section').setAttribute('id', this.getAttribute('name'));
    }

  connectedCallback() {
    const converter = new showdown.Converter();
    fetch(this.getAttribute('src'))
      .then(response => response.text())
      .then(text => {
        this.shadowRoot.querySelector("section").innerHTML = converter.makeHtml(text);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

// Define the new element
export default ContentSection;