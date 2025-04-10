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
  const response = await fetch(`./pages/${pageName}/${pageName}.html`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.text();
};

const loadPageScripts = async (pageName, pageConfig) => {
  const scripts = pageConfig[pageName]?.scripts || [];

  if (scripts.length === 0) {
    console.log(`No scripts to load for page: ${pageName}`);
    return "No scripts loaded";
  }

  return Promise.all(
    scripts.map((scriptSrc) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.type = "module";
        script.async = true;
        script.setAttribute("data-page-script", "");
        document.body.appendChild(script);

        script.onload = () => {
          console.log(`Script loaded: ${scriptSrc}`);
          resolve(scriptSrc);
        };

        script.onerror = () => {
          console.error(`Script failed to load: ${scriptSrc}`);
          reject(new Error(`Failed to load script: ${scriptSrc}`));
        };
      });
    })
  );
};

const loadPage = async (pageName, pageConfig, onPageReady, params = {}) => {
  displayLoadingState();
  clearOldScripts();

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
