import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  // base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        homePage: resolve(__dirname, "src/pages/home/home.html"),
        galleryPage: resolve(__dirname, "src/pages/gallery/gallery.html"),
        aboutPage: resolve(__dirname, "src/pages/about/about.html"),
        contactPage: resolve(__dirname, "src/pages/contact/contact.html"),
      },
    },
  },
});
