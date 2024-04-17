import ContentOverlay from '../components/content-overlay.js';

document.addEventListener("DOMContentLoaded", function() {
    // Load custom elements.
    customElements.define("content-overlay", ContentOverlay);

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    const currentYearElement = document.getElementById("currentYear");
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    const termsOfUseLink = document.getElementById("termsOfUse");
    const privacyPolicyLink = document.getElementById("privacyPolicy");
    const termsOfUseComponent = document.querySelector('content-overlay[src="content/TermsOfUse.md"]');
    const privacyPolicyComponent = document.querySelector('content-overlay[src="content/PrivacyPolicy.md"]');

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
  
    window.addEventListener("scroll", highlightNavLink);
    highlightNavLink(); // Highlight correct link on page load
  });