import "./home.scss";
import { initPage } from "../../common/javascript/helper/page-init";
import { pageConfig } from "../../common/javascript/config/page-config";
import { loadPage } from "../../common/javascript/helper/navigation-helper";

const initHomePage = () => {
  const nav = document.querySelector("nav.top-nav");
  const mobileNav = document.querySelector(".mobile-menu");
  const actionButton = document.querySelector("#btn-explore");

  const clearActiveClasses = (links) => {
    links.forEach((link) => link.classList.remove("active"));
  };

  const setActiveGalleryLink = (links) => {
    const galleryLink = findGalleryLink(links);
    if (galleryLink) {
      galleryLink.classList.add("active");
    }
  };

  const findGalleryLink = (links) => {
    return Array.from(links).find((link) => link.dataset.page === "gallery");
  };

  const setupExploreGalleryButton = () => {
    const navLinks = nav.querySelectorAll("a"); // Target links within the nav
    const mobileNavLinks = mobileNav.querySelectorAll("a"); // Target links within the mobile nav

    clearActiveClasses(navLinks);
    clearActiveClasses(mobileNavLinks);

    setActiveGalleryLink(navLinks);
    setActiveGalleryLink(mobileNavLinks);

    loadPage("gallery", pageConfig, initPage);
  };

  actionButton.addEventListener("click", setupExploreGalleryButton);
};

export { initHomePage };
