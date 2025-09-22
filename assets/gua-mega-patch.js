// Find the "Shop By Specifications" link and modify the menu structure
function addMenuClasses() {
    // Find the <a> element with title "Shop By Specifications"
    const shopBySpecsLink = document.querySelector('a[title="Shop By Specifications"]');
    
    if (!shopBySpecsLink) {
        console.log('Shop By Specifications link not found');
        return;
    }
    
    // Get the parent <li> element of the "Shop By Specifications" link
    const parentLi = shopBySpecsLink.closest('li');
    
    if (!parentLi) {
        console.log('Parent <li> element not found');
        return;
    }
    
    // Find all <li> elements that are immediate children of <ul> elements 
    // within the "Shop By Specifications" submenu structure
    const submenuUls = parentLi.querySelectorAll('ul');
    
    submenuUls.forEach(ul => {
        // Add "spec-list" class to each <ul> in the hierarchy below
        ul.classList.add('spec-list');
        
        // Find immediate <li> children of this <ul> and add "spec-group" class
        const immediateLiChildren = ul.querySelectorAll(':scope > li');
        immediateLiChildren.forEach(li => {
            li.classList.add('spec-group');
        });
    });
    
    console.log('Classes added successfully');
    console.log(`Found ${submenuUls.length} <ul> elements with "spec-list" class`);
    console.log(`Added "spec-group" class to ${parentLi.querySelectorAll('ul > li').length} <li> elements`);
}

// Run the function when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMenuClasses);
} else {
    addMenuClasses();
}