// Toggle between login and signup forms
function toggleForms(event) {
  event.preventDefault();
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm.classList.contains("hidden")) {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  } else {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  }
}

// Add event listeners for the Google and Facebook buttons
document.querySelectorAll(".google-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    // Placeholder for your actual Google login logic
    alert("Login with Google clicked");
  });
});

document.querySelectorAll(".facebook-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    // Placeholder for your actual Facebook login logic
    alert("Login with Facebook clicked");
  });
});
