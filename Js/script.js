// for blood card animation
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.85;

    if (rect.top < triggerPoint) {
      card.classList.add('show');
    } else {
      card.classList.remove('show');
    }
  });
});

// Typewriter effect
const textArray = [
  "Be Someone's Miracle, Donate Blood",
  "Join the Movement - Give the Gift of Life"
];

let textIndex = 0;
let charIndex = 0;
let typing = true;
const typeSpeed = 150;
const deleteSpeed = 100;
const delayBetween = 1500;

const target = document.getElementById("typewriter");

function type() {
  const currentText = textArray[textIndex];
  if (typing) {
    target.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex < currentText.length) {
      setTimeout(type, typeSpeed);
    } else {
      typing = false;
      setTimeout(type, delayBetween);
    }
  } else {
    target.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex > 0) {
      setTimeout(type, deleteSpeed);
    } else {
      typing = true;
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }
}
type();

// Code that will be in every page
document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("LoggedInUser");

  // If user is not logged in, redirect
  if (!user) {
    alert("Please log in first!");
    window.location.href = "Pages/login.html";
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
  window.location.href = "Pages/login.html"; 
}
