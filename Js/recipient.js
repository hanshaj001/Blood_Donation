document.addEventListener("DOMContentLoaded", function () {
  // Check login
  const user = localStorage.getItem("LoggedInUser");
  if (!user) {
    alert("Please log in first!");
    window.location.href = "login.html";
    return;
  }

  // Set logout link
  const authLink = document.getElementById("authLink");
  authLink.innerHTML = `
    <a href="#" onclick="logout()">
      <i class="fa-solid fa-right-from-bracket"></i> Logout
    </a>
  `;

  // Handle recipient form
  const form = document.getElementById("donorForm");
  const matchedDonorsContainer = document.getElementById("matchedDonors");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Input values
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const location = document.getElementById("Location").value;
    const blood = document.getElementById("blood").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    let isValid = true;

    // Validation
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
      document.getElementById("nameError").textContent = "Enter a valid name.";
      isValid = false;
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      document.getElementById("ageError").textContent = "Enter a valid age.";
      isValid = false;
    }

    if (!gender) {
      document.getElementById("genderError").textContent = "Select gender.";
      isValid = false;
    }

    if (!location) {
      document.getElementById("LocationError").textContent = "Select location.";
      isValid = false;
    }

    if (!blood) {
      document.getElementById("bloodError").textContent = "Select blood group.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent = "Invalid email format.";
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      document.getElementById("phoneError").textContent = "Phone must be 10 digits.";
      isValid = false;
    }

    if (!isValid) return;

    // Clear previous results
    matchedDonorsContainer.innerHTML = "";

    // Get donors
    const donors = JSON.parse(localStorage.getItem("donors")) || [];

    const matches = donors.filter(donor =>
      donor.blood === blood && donor.location === location
    );

    if (matches.length === 0) {
      matchedDonorsContainer.innerHTML = `<p style="color:red; font-weight:bold;">No matching donors found.</p>`;
      matchedDonorsContainer.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Show matching donors
    matches.forEach(donor => {
      const card = document.createElement("div");
      card.classList.add("donor-card");

      card.innerHTML = `
        <div class="donor-header">
          <div class="donor-avatar">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div class="donor-body">
          <h3>${donor.name}</h3>
          <p><strong>Location:</strong> ${donor.location}</p>
          <p><strong>Blood Group:</strong> ${donor.blood}</p>
          <p><strong>Phone:</strong> <a href="tel:${donor.phone}">${donor.phone}</a></p>
          <p><strong>Gender:</strong> ${donor.gender}</p>
          <p><strong>Age:</strong> ${donor.age}</p>
          <p><strong>Email:</strong> <a href="mailto:${donor.email}">${donor.email}</a></p>
        </div>
      `;

      matchedDonorsContainer.appendChild(card);
    });

    // Scroll to result
    matchedDonorsContainer.scrollIntoView({ behavior: "smooth" });
  });
});

// Logout function
function logout() {
  localStorage.removeItem("LoggedInUser");
  alert("You have been logged out!");
  window.location.href = "login.html";
}
