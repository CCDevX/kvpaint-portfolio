const initPage = async (pageName, params = {}) => {
  switch (pageName) {
    case "home":
      await import("../../../pages/home/home.js");
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
