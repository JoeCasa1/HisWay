document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const proceedButton = document.getElementById("proceed-button");
  
    emailInput.addEventListener("input", validateForm);
    phoneInput.addEventListener("input", validateForm);
  
    function validateForm() {
      if (isValidEmail(emailInput.value) || isValidPhoneNumber(phoneInput.value)) {
        proceedButton.disabled = false;
      } else {
        proceedButton.disabled = true;
      }
    }
  
    function isValidEmail(email) {
      // Regular expression to match the specified email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // Test the email against the regex
      return emailRegex.test(email);
    }

    function isValidPhoneNumber(phone) {
      // Regular expression to match the specified phone number format
      const phoneRegex = /^(1[\s.-]?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
      
      // Test the phone number against the regex
      return phoneRegex.test(phone);
    }
  });
  