import "./index.scss";
import "./common/javascript/helper/theme-helper.js";
import { initPage } from "./common/javascript/helper/page-init.js";
import { pageConfig } from "./common/javascript/config/page-config.js";
import { loadPage } from "./common/javascript/helper/navigation-helper.js";
import logo from "./assets/img/logo.png";

document.addEventListener("DOMContentLoaded", () => {
  initNavMenu();
  loadPage("home", pageConfig, initPage); // Load home page by default
});

const menuBtn = document.querySelector("#menu-icon");
const topNav = document.querySelector(".top-nav");

const initNavMenu = () => {
  const img = document.querySelector("#logo");
  img.src = logo;
  const navLinks = document.querySelectorAll("nav.top-nav a");
  bindLinkEvents(navLinks);

  const mobileMenu = document.querySelector(".mobile-menu");

  mobileMenu.innerHTML = topNav.innerHTML;

  const unwantedDiv = mobileMenu.querySelector(".button-container");
  if (unwantedDiv) {
    unwantedDiv.remove();
  }

  const mobileNavLink = mobileMenu.querySelectorAll("ul li a");
  bindLinkEvents(mobileNavLink);

  mobileNavLink.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove "active" class from all navigation links
      mobileNavLink.forEach((el) => el.classList.remove("active"));

      // Add "active" class to the clicked link
      e.currentTarget.classList.add("active");

      // Load the corresponding page based on data-page attribute
      const page = e.currentTarget.getAttribute("data-page");
      loadPage(page, pageConfig, initPage);
    });
  });

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      console.log("enter resize");
      mobileMenu.classList.remove("active");
    }
  });
};

const bindLinkEvents = (links) => {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      links.forEach((el) => el.classList.remove("active"));

      e.currentTarget.classList.add("active");

      const page = e.currentTarget.getAttribute("data-page");
      console.log("page : ", page);
      loadPage(page, pageConfig, initPage);
    });
  });
};
