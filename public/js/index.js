import "@babel/polyfill";
import { displayMap } from "./mapbox";
import { login, logout } from "./login";
import { updateData } from "./updateSettings";

// DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logoutButton = document.querySelector(".nav__el--logout");

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(
    document.getElementById(mapBox.dataset.locations)
  );

  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logoutButton) logoutButton.addEventListener("click", logout);
