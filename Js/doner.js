

  // code that will be in every page

document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("LoggedInUser");

    // If user is not logged in, redirect
    if (!user) {
      alert("Please log in first!");
      window.location.href = "login.html";
      return; // stop execution
    }

    // If logged in, show only Logout link
    const authLink = document.getElementById("authLink");
    authLink.innerHTML = `
      <a href="#" onclick="logout()">
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </a>
    `;
  });

  // Logout Function
  function logout() {
    localStorage.removeItem("LoggedInUser");
    alert("You have been logged out!");
    window.location.href = "login.html";
  }



document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("donorForm").addEventListener("submit", function (event) {
    event.preventDefault();


    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let gender = document.getElementById("gender").value;
    let location = document.getElementById("Location").value;
    let weight = document.getElementById("weight").value.trim();
    let blood = document.getElementById("blood").value;
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let isValid = true;

    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    if (name === "" || !/^[A-Za-z\s]+$/.test(name)) {
      document.getElementById("nameError").textContent = "Name must contain only letters and spaces.";
      isValid = false;
    }

    let ageNumber = parseInt(age, 10);
    if (!age || isNaN(ageNumber)  ||ageNumber < 18 || ageNumber > 55) {
      document.getElementById("ageError").textContent = "Age must be between 18 and 55.";
      isValid = false;
    }

    if (!gender) {
      document.getElementById("genderError").textContent = "Please select a gender.";
      isValid = false;
    }

    if (location === "") {
      document.getElementById("LocationError").textContent = "Please select a location.";
      isValid = false;
    }

    if (weight === ""||  isNaN(weight)  || weight < 40) {
      document.getElementById("weightError").textContent = "Weight must be 40kg or above.";
      isValid = false;
    }

    if (!blood) {
      document.getElementById("bloodError").textContent = "Please select a blood group.";
      isValid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent = "Invalid email format.";
      isValid = false;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      document.getElementById("phoneError").textContent = "Phone must be 10 digits.";
      isValid = false;
    }

    if (isValid) { 
      let newDonor = {
        name,
        age,
        gender,
        location,
        weight,
        blood,
        email,
        phone
      };

      // get existig items
      let donors = JSON.parse(localStorage.getItem("donors")) || [];
      donors.push(newDonor);

      // setting new doner 
      localStorage.setItem("donors",JSON.stringify(donors));


      alert("Donor registered successfully!");
      document.getElementById("donorForm").reset();
    }
  });
});