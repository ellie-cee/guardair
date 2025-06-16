document.addEventListener('DOMContentLoaded', function() {
  // Remove '– Guardair Corporation' from the document title
  if (document.title.includes('– Guardair Corporation')) {
    document.title = document.title.replace('– Guardair Corporation', '').trim();
  }

  if (document.querySelector('.breadcrumb')) {
    
    // When on a collection, clear the session storage to avoid incorrect breadcrumbs
    if (window.location.href.includes("/collections")) {
      sessionStorage.removeItem('lastVisited');
      sessionStorage.removeItem('lastPageTitle');
    }

    // When on a standalone page with products, store the current URL and page title
    if (window.location.pathname.includes("/pages")) {
      const pageTitle = document.title; 
      sessionStorage.setItem('lastVisited', window.location.href);
      sessionStorage.setItem('lastPageTitle', pageTitle);
    }

    // When you're on a product detail page, update the breadcrumb if needed
    const lastVisited = sessionStorage.getItem('lastVisited');
    const lastPageTitle = sessionStorage.getItem('lastPageTitle');
    
    if (window.location.href.includes("/products/") && lastVisited) {
      var breadcrumbLink = document.querySelector('.breadcrumb a[href*="/collections/"]');
      if (breadcrumbLink) {
        breadcrumbLink.href = lastVisited;

        // Use the stored page title, or default to "Back to Product List" if title isn't available
        breadcrumbLink.textContent = lastPageTitle || "Back to Product List";
      }
    }
  }
});
