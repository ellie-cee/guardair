// Find all "Shop By Specifications" links and modify their menu structures
function addMenuClasses() {
    // Find all tmenu_wrapper containers
    const menuWrappers = document.querySelectorAll('.tmenu_wrapper');
    
    if (menuWrappers.length === 0) {
        console.log('No tmenu_wrapper elements found');
        return;
    }
    
    let totalProcessed = 0;
    let totalUlsModified = 0;
    let totalLisModified = 0;
    
    // Process each menu wrapper
    menuWrappers.forEach((wrapper, wrapperIndex) => {
        // Find all "Shop By Specifications" links within this wrapper
        const shopBySpecsLinks = wrapper.querySelectorAll('a[title="Shop By Specifications"]');
        
        shopBySpecsLinks.forEach((link, linkIndex) => {
            // Get the parent <li> element of the "Shop By Specifications" link
            const parentLi = link.closest('li');
            
            if (!parentLi) {
                console.log(`Parent <li> element not found for link ${linkIndex + 1} in wrapper ${wrapperIndex + 1}`);
                return;
            }
            
            // Find all <li> elements that are immediate children of <ul> elements 
            // within the "Shop By Specifications" submenu structure
            const submenuUls = parentLi.querySelectorAll('ul');
            
            submenuUls.forEach(ul => {
                // Add "spec-list" class to each <ul> in the hierarchy below
                ul.classList.add('spec-list');
                totalUlsModified++;
                
                // Find immediate <li> children of this <ul> and add "spec-group" class
                const immediateLiChildren = ul.querySelectorAll(':scope > li');
                immediateLiChildren.forEach(li => {
                    li.classList.add('spec-group');
                    totalLisModified++;
                });
            });
            
            totalProcessed++;
            console.log(`Processed "Shop By Specifications" link ${linkIndex + 1} in wrapper ${wrapperIndex + 1}`);
        });
    });
    
    console.log('Classes added successfully');
    console.log(`Processed ${totalProcessed} "Shop By Specifications" instances across ${menuWrappers.length} menu wrappers`);
    console.log(`Added "spec-list" class to ${totalUlsModified} <ul> elements`);
    console.log(`Added "spec-group" class to ${totalLisModified} <li> elements`);
}

// Run the function when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMenuClasses);
} else {
    addMenuClasses();
}