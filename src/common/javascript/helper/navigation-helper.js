const pageContent = document.querySelector("#page-content");

const displayLoadingState = () => {
  pageContent.innerHTML =
    '<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</div>';
};

const clearOldScripts = () => {
  document.querySelectorAll("script[data-page-script]").forEach((script) => {
    script.remove();
  });
};

const fetchPageContent = async (pageName) => {
  console.log("fetch content scriptpageName : ", pageName);
  const response = await fetch(`./pages/${pageName}/${pageName}.html`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.text();
};

const loadPageScripts = async (pageName, pageConfig) => {
  console.log("load scriptpageName : ", pageName);
  try {
    const module = await import(`@pages/${pageName}/${pageName}.js`);
    return module;
  } catch (error) {
    console.error(`Erreur de chargement de ${pageName}:`, error);
    throw error;
  }
};

const loadPage = async (pageName, pageConfig, onPageReady, params = {}) => {
  displayLoadingState();
  // clearOldScripts();

  try {
    const html = await fetchPageContent(pageName);
    pageContent.innerHTML = html;

    await loadPageScripts(pageName, pageConfig);
    console.log(`Page ${pageName} fully loaded.`);

    if (typeof onPageReady === "function") {
      onPageReady(pageName, params);
    }
  } catch (error) {
    console.error(`Could not load page "${pageName}":`, error);
    pageContent.innerHTML = `
      <div class="error-container">
        <h1>Error loading page</h1>
        <button onclick="location.reload()">Reload</button>
      </div>`;
  }
};

export {
  displayLoadingState,
  clearOldScripts,
  fetchPageContent,
  loadPageScripts,
  loadPage,
};
