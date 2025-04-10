import "./gallery.scss";

let images_per_page = 0;
let currentPage = 1;
let currentFilter = "all";
let allImages = [];
let pagination = null;
let container = null;

// Déclarez handleFilterClick AVANT de l'utiliser
function handleFilterClick() {
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.remove("active");
  });
  this.classList.add("active");
  currentFilter = this.dataset.filter;
  currentPage = 1;
  renderGallery();
}

function cleanupGallery() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.removeEventListener("click", handleFilterClick);
  });
}

function setupFilterButtons() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", handleFilterClick);
  });
}

function initGallery() {
  console.log("Init gallery script");
  currentPage = 1;
  currentFilter = "all";
  images_per_page = 16;
  allImages = [];

  pagination = document.getElementById("pagination");
  container = document.querySelector(".gallery-grid");

  if (!container) {
    console.warn("Gallery container not found, retrying...");
    return;
  }

  window.addEventListener("resize", (event) => {
    console.log("reisze");
    const controller = document.querySelector(".gallery-controls");
    if (window.innerWidth <= 767) {
      controller.style.display = "none";
      images_per_page = 9;
      itemsPerPageSelect.value = "9";
    } else {
      controller.style.display = "block";
      images_per_page = 16;
      itemsPerPageSelect.value = "16";
    }
    currentPage = 1;
    renderGallery();
  });

  fetchImages();
  cleanupGallery(); // Nettoyage avant initialisation
  setupFilterButtons();
  renderGallery();
}

function fetchImages() {
  const roundImages = Array.from({ length: 14 }, (_, i) => ({
    src: `gallery/round/round${i}.jpg`, // Chemin relatif depuis le dossier public/
    category: "round",
  }));

  const canvasImages = Array.from({ length: 8 }, (_, i) => ({
    src: `gallery/canvas/canvas${i}.jpg`,
    category: "canvas",
  }));

  allImages = [...roundImages, ...canvasImages];
}

function openImagePreview(index, images) {
  if (index < 0 || index >= images.length) {
    console.error("Index invalide :", index);
    return;
  }

  console.log("images ", images);
  console.log("index ", index);

  const previewContainer = document.createElement("div");
  previewContainer.className = "image-preview";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => previewContainer.remove();

  const previewImage = document.createElement("img");
  previewImage.src = `/assets/img/${images[index].src}`; // ✅ Index validé

  previewContainer.appendChild(closeBtn);
  previewContainer.appendChild(previewImage);
  document.body.appendChild(previewContainer);

  previewContainer.addEventListener("click", (e) => {
    if (e.target === previewContainer) previewContainer.remove();
  });
}

function renderGallery() {
  cleanupGallery(); // Nettoie les anciens écouteurs

  const filtered =
    currentFilter === "all"
      ? allImages
      : allImages.filter((img) => img.category === currentFilter);

  const start = (currentPage - 1) * images_per_page;
  const imagesToShow = filtered.slice(start, start + images_per_page);

  container.innerHTML = imagesToShow
    .map((img, index) => {
      // Ajoutez le paramètre 'index' ici
      const globalIndex = start + index; // Index global dans filtered
      const imageUrl = `/assets/img/${img.src}`;
      return `
      <div class="gallery-item ${img.category}" data-index="${globalIndex}">
        <img src="${imageUrl}" alt="Artwork" />
      </div>
    `;
    })
    .join("");

  // Ajout des gestionnaires d'événements
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      const index = parseInt(img.closest(".gallery-item").dataset.index);
      console.log("query index", index);
      openImagePreview(index, filtered);
    });
  });

  renderPagination(filtered.length);
  setupFilterButtons(); // Réattache les écouteurs
}

function renderPagination(total) {
  const totalPages = Math.ceil(total / images_per_page);
  const indicator = document.getElementById("page-indicator");
  indicator.textContent = `Page ${currentPage} sur ${totalPages}`;

  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled = currentPage === totalPages;

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

const itemsPerPageSelect = document.getElementById("itemsPerPage");
if (itemsPerPageSelect) {
  itemsPerPageSelect.addEventListener("change", (e) => {
    images_per_page = parseInt(e.target.value, 10);
    currentPage = 1;
    renderGallery();
  });
}

initGallery();
