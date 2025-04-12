import "./home.scss";
import { initPage } from "../../common/javascript/helper/page-init";
import { pageConfig } from "../../common/javascript/config/page-config";
import { loadPage } from "../../common/javascript/helper/navigation-helper";
const initHomePage = () => {
  const setupExploreGalleryButton = () => {
    const navLinks = document.querySelectorAll("nav.top-nav a");
    const mobileNavLink = document.querySelectorAll(".mobile-menu ul li a");

    // Supprime la classe active de tous les liens du menu
    navLinks.forEach((link) => link.classList.remove("active"));
    mobileNavLink.forEach((link) => link.classList.remove("active"));

    // Active le lien de la page Galerie dans le menu
    const galleryLink = Array.from(navLinks).find(
      (link) => link.dataset.page === "gallery"
    );

    const mobileGalleryLink = Array.from(navLinks).find(
      (link) => link.dataset.page === "gallery"
    );
    if (galleryLink) {
      galleryLink.classList.add("active");
    }

    if (mobileGalleryLink) {
      mobileGalleryLink.classList.add("active");
    }

    // Charge la page Galerie
    loadPage("gallery", pageConfig, initPage);
  };

  const actionButton = document.querySelector("#btn-explore");

  actionButton.addEventListener("click", setupExploreGalleryButton);
};

export { initHomePage };
