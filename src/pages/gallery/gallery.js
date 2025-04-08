import "./gallery.scss";

const galleryItems = document.querySelectorAll(".gallery-item img");
const previewImage = document.getElementById("preview-image");
const previewContainer = document.getElementById("gallery-preview");
const placeholder = document.getElementById("placeholder-message");

console.log(galleryItems);

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    previewImage.src = item.src;
    previewContainer.classList.remove("hidden");
    placeholder.classList.add("inactive");
  });
});
