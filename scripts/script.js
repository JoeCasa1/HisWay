import ContentOverlay from '../components/content-overlay.js';
import ContentSection from '../components/content-section.js';

document.addEventListener("DOMContentLoaded", function() {
    // Load custom elements.
    customElements.define("content-overlay", ContentOverlay);
    customElements.define("content-section", ContentSection);

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    const currentYearElement = document.getElementById("currentYear");
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    const termsOfUseLink = document.getElementById("termsOfUse");
    const privacyPolicyLink = document.getElementById("privacyPolicy");
    const termsOfUseComponent = document.querySelector('content-overlay[src="content/TermsOfUse.md"]');
    const privacyPolicyComponent = document.querySelector('content-overlay[src="content/PrivacyPolicy.md"]');

    const cookieOverlay = document.querySelector('.cookie-overlay');
    const cookieAcceptButton = document.querySelector('.cookie-accept-button');

    cookieAcceptButton.addEventListener('click', () => {
      cookieOverlay.classList.remove('show');
    });

    termsOfUseLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default behavior
      termsOfUseComponent.open();
    });

    privacyPolicyLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default behavior
      privacyPolicyComponent.open();
    });
      
    function highlightNavLink() {
      let index = sections.length;
  
      while(--index && window.scrollY + 20 < sections[index].offsetTop) {}
  
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }

    function fillSection(section) {
      const converter = new showdown.Converter();
      fetch(section.getAttribute('src'))
        .then(response => response.text())
        .then(text => {
          section.innerHTML = converter.makeHtml(text);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Check if the "cookies accepted" cookie exists
if (!getCookie('cookiesAccepted')) {
  cookieOverlay.classList.add('show');
}

cookieAcceptButton.addEventListener('click', () => {
  // Set the "cookies accepted" cookie when the button is clicked
  setCookie('cookiesAccepted', 'true', 7); // Expires in 7 days
  cookieOverlay.classList.remove('show');
});    
    
    // Use Promise.all to fill all sections before adding the scroll event listener.
    // This way, the scroll event listener will only be added once all sections are filled.
    Promise.all(Array.from(sections).map(fillSection))
      .then(() => {
        window.addEventListener("scroll", highlightNavLink);
        highlightNavLink(); // Highlight correct link on page load
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });