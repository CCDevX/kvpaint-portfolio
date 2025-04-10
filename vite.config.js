import { defineConfig } from "vite";
import path, { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: "./src",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // pour utiliser @/
    },
  },
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
        homeJS: resolve(__dirname, "src/pages/home/home.js"),
        galleryJS: resolve(__dirname, "src/pages/gallery/gallery.js"),
        aboutJS: resolve(__dirname, "src/pages/about/about.js"),
        contactJS: resolve(__dirname, "src/pages/contact/contact.js"),
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "assets/**/*", // Chemin depuis ./src (car root: "./src")
          dest: "assets",
        },
        { src: "pages/home/home.js", dest: "pages/home" },
        { src: "pages/gallery/gallery.js", dest: "pages/gallery" },
        { src: "pages/about/about.js", dest: "pages/about" },
        { src: "pages/contact/contact.js", dest: "pages/contact" },
        { src: "common/javascript/config/*", dest: "common/javascript/config" },
        { src: "common/javascript/helper/*", dest: "common/javascript/helper" },
        { src: "common/scss/*", dest: "common/scss" },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["./src"], // pour que Sass comprenne @/
      },
    },
  },
});
