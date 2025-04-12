import { initHomePage } from "../../../pages/home/home.js";

const initPage = async (pageName, params = {}) => {
  switch (pageName) {
    case "home":
      await import("../../../pages/home/home.js");
      initHomePage();
      break;
    case "gallery":
      await import("../../../pages/gallery/gallery.js");
      break;
    case "about":
      await import("../../../pages/about/about.js");
      break;
    case "contact":
      await import("../../../pages/contact/contact.js");
      break;
    default:
      break;
  }
};

export { initPage };
