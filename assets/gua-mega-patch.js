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

// Enhanced debugging version to troubleshoot the issue
function addMenuClasses() {
    console.log('=== Starting addMenuClasses ===');
    
    // Find all tmenu_wrapper containers
    const menuWrappers = document.querySelectorAll('.tmenu_wrapper');
    console.log(`Found ${menuWrappers.length} .tmenu_wrapper elements`);
    
    if (menuWrappers.length === 0) {
        console.log('No tmenu_wrapper elements found');
        // Let's check for other possible menu structures
        const allMenus = document.querySelectorAll('[class*="menu"], [class*="nav"]');
        console.log(`Found ${allMenus.length} elements with menu/nav in class name:`, allMenus);
        return;
    }
    
    let totalProcessed = 0;
    let totalUlsModified = 0;
    let totalLisModified = 0;
    
    // Process each menu wrapper
    menuWrappers.forEach((wrapper, wrapperIndex) => {
        console.log(`Processing wrapper ${wrapperIndex + 1}:`, wrapper);
        
        // Find all "Shop By Specifications" links within this wrapper
        const shopBySpecsLinks = wrapper.querySelectorAll('a[title="Shop By Specifications"]');
        console.log(`Found ${shopBySpecsLinks.length} "Shop By Specifications" links in wrapper ${wrapperIndex + 1}`);
        
        // Let's also check for variations in the title text
        const allLinks = wrapper.querySelectorAll('a[title*="Shop"], a[title*="Spec"]');
        console.log(`Found ${allLinks.length} links with "Shop" or "Spec" in title:`, 
                   Array.from(allLinks).map(link => link.getAttribute('title')));
        
        shopBySpecsLinks.forEach((link, linkIndex) => {
            console.log(`Processing link ${linkIndex + 1}:`, link);
            
            // Get the parent <li> element of the "Shop By Specifications" link
            const parentLi = link.closest('li');
            
            if (!parentLi) {
                console.log(`Parent <li> element not found for link ${linkIndex + 1} in wrapper ${wrapperIndex + 1}`);
                return;
            }
            
            console.log(`Parent <li> found:`, parentLi);
            
            // Find all <li> elements that are immediate children of <ul> elements 
            // within the "Shop By Specifications" submenu structure
            const submenuUls = parentLi.querySelectorAll('ul');
            console.log(`Found ${submenuUls.length} <ul> elements in submenu`);
            
            submenuUls.forEach((ul, ulIndex) => {
                console.log(`Processing <ul> ${ulIndex + 1}:`, ul);
                
                // Add "spec-list" class to each <ul> in the hierarchy below
                ul.classList.add('spec-list');
                totalUlsModified++;
                console.log(`Added "spec-list" class to <ul> ${ulIndex + 1}`);
                
                // Find immediate <li> children of this <ul> and add "spec-group" class
                const immediateLiChildren = ul.querySelectorAll(':scope > li');
                console.log(`Found ${immediateLiChildren.length} immediate <li> children`);
                
                immediateLiChildren.forEach((li, liIndex) => {
                    li.classList.add('spec-group');
                    totalLisModified++;
                    console.log(`Added "spec-group" class to <li> ${liIndex + 1}:`, li);
                });
            });
            
            totalProcessed++;
            console.log(`Completed processing link ${linkIndex + 1} in wrapper ${wrapperIndex + 1}`);
        });
    });
    
    console.log('=== Final Results ===');
    console.log(`Processed ${totalProcessed} "Shop By Specifications" instances across ${menuWrappers.length} menu wrappers`);
    console.log(`Added "spec-list" class to ${totalUlsModified} <ul> elements`);
    console.log(`Added "spec-group" class to ${totalLisModified} <li> elements`);
}

// Enhanced waiting function with more debugging
function waitForMenuWrapperWithObserver() {
    console.log('=== Starting waitForMenuWrapperWithObserver ===');
    
    // First check if menu wrappers already exist
    const existingWrappers = document.querySelectorAll('.tmenu_wrapper');
    console.log(`Initial check: found ${existingWrappers.length} existing .tmenu_wrapper elements`);
    
    if (existingWrappers.length > 0) {
        console.log('Menu wrappers already exist, running addMenuClasses immediately');
        addMenuClasses();
        return;
    }
    
    console.log('No menu wrappers found yet, setting up MutationObserver...');
    
    // Set up observer to watch for menu wrapper creation
    const observer = new MutationObserver((mutations) => {
        console.log(`MutationObserver triggered with ${mutations.length} mutations`);
        
        mutations.forEach((mutation, mutationIndex) => {
            console.log(`Processing mutation ${mutationIndex + 1}:`, mutation.type);
            
            mutation.addedNodes.forEach((node, nodeIndex) => {
                console.log(`Checking added node ${nodeIndex + 1}:`, node);
                
                // Check if the added node has tmenu_wrapper class or contains it
                if (node.nodeType === Node.ELEMENT_NODE) {
                    let hasWrapper = false;
                    
                    if (node.classList && node.classList.contains('tmenu_wrapper')) {
                        console.log('Direct tmenu_wrapper element detected');
                        hasWrapper = true;
                    } else if (node.querySelector && node.querySelector('.tmenu_wrapper')) {
                        console.log('Element containing tmenu_wrapper detected');
                        hasWrapper = true;
                    }
                    
                    if (hasWrapper) {
                        console.log('tmenu_wrapper detected via MutationObserver, running addMenuClasses...');
                        addMenuClasses();
                        observer.disconnect();
                        return;
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
    
    console.log('MutationObserver started, also setting up fallback timeout...');
    
    // Fallback timeout with periodic checks
    let checkCount = 0;
    const fallbackCheck = setInterval(() => {
        checkCount++;
        const wrappers = document.querySelectorAll('.tmenu_wrapper');
        console.log(`Fallback check ${checkCount}: found ${wrappers.length} .tmenu_wrapper elements`);
        
        if (wrappers.length > 0) {
            console.log('Fallback: tmenu_wrapper found via timeout check');
            addMenuClasses();
            observer.disconnect();
            clearInterval(fallbackCheck);
        } else if (checkCount >= 50) { // 50 checks = 5 seconds
            console.log('Fallback timeout reached, stopping checks');
            observer.disconnect();
            clearInterval(fallbackCheck);
        }
    }, 100);
}

// Run when DOM is ready, but wait for tmenu_wrapper
console.log('=== Script loaded, checking DOM state ===');
console.log('Document ready state:', document.readyState);

if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded fired, starting menu wrapper detection');
        waitForMenuWrapperWithObserver();
    });
} else {
    console.log('DOM already loaded, starting menu wrapper detection immediately');
    waitForMenuWrapperWithObserver();
}