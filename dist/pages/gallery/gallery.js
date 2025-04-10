import "./gallery.scss";

let previewImage, previewContainer, placeholder, pagination, container;

function initGallery() {
  console.log("Init gallery script");

  previewImage = document.getElementById("preview-image");
  previewContainer = document.getElementById("gallery-preview");
  placeholder = document.getElementById("placeholder-message");
  pagination = document.getElementById("pagination");
  container = document.querySelector(".gallery-grid");

  if (!container) {
    console.warn("Gallery container not found, retrying...");
    return;
  }

  fetchImages();
  setupFilterButtons();
  renderGallery();
}

let IMAGES_PER_PAGE = 4;
let currentPage = 1;
let currentFilter = "all";
let allImages = [];

function fetchImages() {
  const roundImages = Array.from({ length: 14 }, (_, i) => ({
    src: `gallery/round/round${i}.jpg`,
    category: "round",
  }));

  const canvasImages = Array.from({ length: 8 }, (_, i) => ({
    src: `gallery/canvas/canvas${i}.jpg`,
    category: "canvas",
  }));

  allImages = [...roundImages, ...canvasImages];
  console.log("Images loaded:", allImages);
}

function renderGallery() {
  const filtered =
    currentFilter === "all"
      ? allImages
      : allImages.filter((img) => img.category === currentFilter);

  const start = (currentPage - 1) * IMAGES_PER_PAGE;
  const imagesToShow = filtered.slice(start, start + IMAGES_PER_PAGE);

  container.innerHTML = imagesToShow
    .map(
      (img) =>
        `<div class="gallery-item ${img.category}">
           <img src="../../assets/img/${img.src}" alt="Artwork" />
         </div>`
    )
    .join("");

  attachClickHandlers();
  renderPagination(filtered.length);
}

function attachClickHandlers() {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      previewImage.src = item.src;
      previewContainer.classList.remove("hidden");
      placeholder.classList.add("inactive");
    });
  });
}

function renderPagination(total) {
  const totalPages = Math.ceil(total / IMAGES_PER_PAGE);

  // Update indicator text
  const indicator = document.getElementById("page-indicator");
  indicator.textContent = `Page ${currentPage} sur ${totalPages}`;

  // Enable/disable buttons
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled = currentPage === totalPages;

  // Add click handlers
  document.getElementById("prev-page").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderGallery();
    }
  };

  document.getElementById("next-page").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderGallery();
    }
  };
}

function setupFilterButtons() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      currentPage = 1;
      renderGallery();
    });
  });
}

const itemsPerPageSelect = document.getElementById("itemsPerPage");
if (itemsPerPageSelect) {
  itemsPerPageSelect.addEventListener("change", (e) => {
    IMAGES_PER_PAGE = parseInt(e.target.value, 10);
    currentPage = 1;
    renderGallery();
  });
}

// Appel immédiat après import
initGallery();
