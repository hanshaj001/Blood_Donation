
document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("LoggedInUser");

    // If user is not logged in, redirect
    if (!user) {
      alert("Please log in first!");
      window.location.href = "../Pages/login.html";
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


  
