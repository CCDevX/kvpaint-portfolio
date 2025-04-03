import "./index.scss";
import "./common/javascript/helper/theme-helper.js";
import { initPage } from "./common/javascript/helper/page-init.js";
import { pageConfig } from "./common/javascript/config/page-config.js";
import { loadPage } from "./common/javascript/helper/navigation-helper.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavMenu();
  loadPage("home", pageConfig, initPage); // Load home page by default
});

const initNavMenu = () => {
  const navLinks = document.querySelectorAll("nav.top-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove "active" class from all navigation links
      navLinks.forEach((el) => el.classList.remove("active"));

      // Add "active" class to the clicked link
      e.currentTarget.classList.add("active");

      // Load the corresponding page based on data-page attribute
      const page = e.currentTarget.getAttribute("data-page");
      loadPage(page, pageConfig, initPage);
    });
  });
};
