const THEME_KEY = "kv-theme"; // localStorage
const ICON_MOON = "fa-moon";
const ICON_SUN = "fa-sun";

const html = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

function applyTheme(theme) {
  // Apply the data-theme attribute on <html>
  html.setAttribute("data-theme", theme);

  // Update the icon
  if (theme === "dark") {
    themeIcon.classList.remove(ICON_SUN);
    themeIcon.classList.add(ICON_MOON);
  } else {
    themeIcon.classList.remove(ICON_MOON);
    themeIcon.classList.add(ICON_SUN);
  }

  // Save the theme
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  try {
    console.log("enter toggle fct");
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  } catch (e) {
    console.log("toggle error : ", e);
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const themeToApply = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(themeToApply);

  // Toggle button
  themeToggle?.addEventListener("click", toggleTheme);
}

// Initialization
initTheme();
