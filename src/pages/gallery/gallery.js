import "./gallery.scss";

// Configuration
const DEFAULT_IMAGES_PER_PAGE = 16;
const MOBILE_IMAGES_PER_PAGE = 9;
const MOBILE_BREAKPOINT = 767;

// Éléments DOM
let galleryContainer = null;
let paginationContainer = null;
let itemsPerPageSelect = null;
let filterButtons = []; // Use an array for filter buttons

// État
let currentPage = 1;
let currentFilter = "all";
let imagesPerPage =
  window.innerWidth <= MOBILE_BREAKPOINT
    ? MOBILE_IMAGES_PER_PAGE
    : DEFAULT_IMAGES_PER_PAGE;
let allImages = [];

// Fonctions utilitaires
const getImageUrl = (src) => `/assets/img/${src}`;

const clearActiveFilters = () => {
  filterButtons.forEach((btn) => btn.classList.remove("active"));
};

const setActiveFilter = (button) => {
  clearActiveFilters();
  button.classList.add("active");
};

const filterImages = () => {
  return currentFilter === "all"
    ? allImages
    : allImages.filter((img) => img.category === currentFilter);
};

const getPaginatedImages = (images) => {
  const start = (currentPage - 1) * imagesPerPage;
  return images.slice(start, start + imagesPerPage);
};

const createImageElement = (img, index) => {
  const imageUrl = getImageUrl(img.src);
  return `
    <div class="gallery-item ${img.category}" data-index="${index}">
      <img src="${imageUrl}" alt="Artwork" loading="lazy" onerror="this.onerror=null; this.src='/assets/img/placeholder.png';" /> 
    </div>
  `;
};

const renderGalleryItems = (images) => {
  if (!galleryContainer) {
    console.error("Gallery container is not available.");
    return; // Exit if container is not ready
  }

  galleryContainer.innerHTML = images
    .map((img, index) => createImageElement(img, index))
    .join("");

  // Event listeners for image click
  galleryContainer.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      const index = parseInt(img.closest(".gallery-item").dataset.index, 10);
      openImagePreview(index, images);
    });
  });
};

const updatePaginationDisplay = (totalImages) => {
  if (!paginationContainer) {
    console.error("Pagination container is not available.");
    return; // Exit if container is not ready
  }

  const totalPages = Math.ceil(totalImages / imagesPerPage);
  const pageIndicator = document.getElementById("page-indicator");
  pageIndicator.textContent = `Page ${currentPage} sur ${totalPages}`;

  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;

  prevPageButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderGallery();
    }
  };

  nextPageButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderGallery();
    }
  };
};

const openImagePreview = (index, images) => {
  if (index < 0 || index >= images.length) {
    console.error("Invalid index:", index);
    return;
  }

  const previewContainer = document.createElement("div");
  previewContainer.className = "image-preview";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => previewContainer.remove();

  const previewImage = document.createElement("img");
  previewImage.src = getImageUrl(images[index].src);

  previewContainer.appendChild(closeBtn);
  previewContainer.appendChild(previewImage);
  document.body.appendChild(previewContainer);

  previewContainer.addEventListener("click", (e) => {
    if (e.target === previewContainer) previewContainer.remove();
  });
};

const renderGallery = () => {
  const filteredImages = filterImages();
  const paginatedImages = getPaginatedImages(filteredImages);

  renderGalleryItems(paginatedImages);
  updatePaginationDisplay(filteredImages.length);
};

const fetchImages = () => {
  const roundImages = Array.from({ length: 14 }, (_, i) => ({
    src: `gallery/round/round${i}.jpg`,
    category: "round",
  }));

  const canvasImages = Array.from({ length: 8 }, (_, i) => ({
    src: `gallery/canvas/canvas${i}.jpg`,
    category: "canvas",
  }));

  allImages = [...roundImages, ...canvasImages];

  console.log("all images", allImages);
};

const initGallery = () => {
  // Initialize DOM elements early
  galleryContainer = document.querySelector(".gallery-grid");
  paginationContainer = document.getElementById("pagination");
  itemsPerPageSelect = document.getElementById("itemsPerPage");
  filterButtons = document.querySelectorAll(".filter-btn"); // Store filter buttons

  if (!galleryContainer) {
    console.warn("Gallery container not found, retrying...");
    return; // Early return if container is not found
  }

  fetchImages();
  renderGallery(); // Initial render

  // Event listeners
  filterButtons.forEach((btn) =>
    btn.addEventListener("click", function () {
      setActiveFilter(this);
      currentFilter = this.dataset.filter;
      currentPage = 1;
      renderGallery();
    })
  );

  if (itemsPerPageSelect) {
    itemsPerPageSelect.addEventListener("change", (e) => {
      imagesPerPage = parseInt(e.target.value, 10);
      currentPage = 1;
      renderGallery();
    });
  }

  window.addEventListener("resize", () => {
    imagesPerPage =
      window.innerWidth <= MOBILE_BREAKPOINT
        ? MOBILE_IMAGES_PER_PAGE
        : DEFAULT_IMAGES_PER_PAGE;
    currentPage = 1;
    renderGallery();
  });
};

export { initGallery };
