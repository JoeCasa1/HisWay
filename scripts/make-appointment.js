document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const proceedButton = document.getElementById("proceedButton");
  const additionalFields = document.getElementById("additionalFields");

  // Function to validate inputs
  function validateInputs() {
    const emailValid = emailInput.value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const phoneValid = phoneInput.value.trim() !== "" && /^1?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneInput.value.trim());
    proceedButton.disabled = !(emailValid || phoneValid);
    if(proceedButton.disabled){
      document.getElementById('validationMessage').style.display = 'block';
    } else {
      document.getElementById('validationMessage').style.display = 'none';
    }
  }

  // Add event listeners to validate on input change
  emailInput.addEventListener("input", validateInputs);
  phoneInput.addEventListener("input", validateInputs);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    fetch('http://example.com/api/CustomerExists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, email }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        // Show password field and the received identifier
        const receivedInfo = data.received === 'phoneNumber' ? phone : email;
        additionalFields.innerHTML = `
          <p>${receivedInfo}</p>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password">
        `;
      } else {
        additionalFields.textContent = 'No existing account found or there was an error.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      additionalFields.textContent = 'Failed to verify the customer.';
    });
  });
});
