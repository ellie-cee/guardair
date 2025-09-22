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

// Wait for tmenu_wrapper to be generated before running our script
function waitForMenuWrapper() {
    const checkForWrapper = () => {
        const menuWrappers = document.querySelectorAll('.tmenu_wrapper');
        
        if (menuWrappers.length > 0) {
            // Menu wrappers found, run our script
            console.log(`Found ${menuWrappers.length} tmenu_wrapper(s), running addMenuClasses...`);
            addMenuClasses();
        } else {
            // Menu wrappers not found yet, check again in 100ms
            setTimeout(checkForWrapper, 100);
        }
    };
    
    checkForWrapper();
}

// Alternative approach using MutationObserver for better performance
function waitForMenuWrapperWithObserver() {
    // First check if menu wrappers already exist
    if (document.querySelectorAll('.tmenu_wrapper').length > 0) {
        addMenuClasses();
        return;
    }
    
    // Set up observer to watch for menu wrapper creation
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                // Check if the added node has tmenu_wrapper class or contains it
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.classList && node.classList.contains('tmenu_wrapper') || 
                        node.querySelector && node.querySelector('.tmenu_wrapper')) {
                        console.log('tmenu_wrapper detected, running addMenuClasses...');
                        addMenuClasses();
                        observer.disconnect(); // Stop observing once we've processed
                    }
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Fallback timeout in case observer doesn't catch it
    setTimeout(() => {
        if (document.querySelectorAll('.tmenu_wrapper').length > 0) {
            console.log('Fallback: tmenu_wrapper found via timeout');
            addMenuClasses();
            observer.disconnect();
        }
    }, 5000); // 5 second fallback
}

// Run when DOM is ready, but wait for tmenu_wrapper
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Use the MutationObserver approach for better performance
        waitForMenuWrapperWithObserver();
        
        // Uncomment the line below if you prefer the simpler polling approach:
        // waitForMenuWrapper();
    });
} else {
    // DOM already loaded
    waitForMenuWrapperWithObserver();
    // waitForMenuWrapper(); // Alternative approach
}