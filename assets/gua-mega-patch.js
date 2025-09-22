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

// Enhanced script to handle dynamically loaded submenus
function addMenuClasses() {
    console.log('=== Starting addMenuClasses ===');
    
    // Find all tmenu_wrapper containers
    const menuWrappers = document.querySelectorAll('.tmenu_wrapper');
    console.log(`Found ${menuWrappers.length} .tmenu_wrapper elements`);
    
    if (menuWrappers.length === 0) {
        console.log('No tmenu_wrapper elements found');
        return;
    }
    
    let totalProcessed = 0;
    let totalUlsModified = 0;
    let totalLisModified = 0;
    
    // Process each menu wrapper
    menuWrappers.forEach((wrapper, wrapperIndex) => {
        console.log(`Processing wrapper ${wrapperIndex + 1}`);
        
        // Find all "Shop By Specifications" links within this wrapper
        const shopBySpecsLinks = wrapper.querySelectorAll('a[title="Shop By Specifications"]');
        console.log(`Found ${shopBySpecsLinks.length} "Shop By Specifications" links in wrapper ${wrapperIndex + 1}`);
        
        // Also find any links with "Essentials" in the title for featured-list processing
        const essentialsLinks = wrapper.querySelectorAll('a[title*="Essentials"]');
        console.log(`Found ${essentialsLinks.length} "Essentials" links in wrapper ${wrapperIndex + 1}`);
        
        // Process all "Essentials" parent menu items
        essentialsLinks.forEach((essentialsLink, essIndex) => {
            const parentLi = essentialsLink.closest('li');
            if (parentLi && !parentLi.classList.contains('featured-list')) {
                parentLi.classList.add('featured-list');
                console.log(`Added "featured-list" to parent <li> of "${essentialsLink.getAttribute('title')}" link`);
                totalLisModified++;
            }
        });
        
        shopBySpecsLinks.forEach((link, linkIndex) => {
            console.log(`Processing "Shop By Specifications" link ${linkIndex + 1}`);
            
            // Get the parent <li> element
            const parentLi = link.closest('li');
            if (!parentLi) {
                console.log(`Parent <li> not found for link ${linkIndex + 1}`);
                return;
            }
            
            // Find all submenu <ul> elements
            const submenuUls = parentLi.querySelectorAll('ul');
            console.log(`Found ${submenuUls.length} <ul> elements in submenu`);
            
            submenuUls.forEach((ul, ulIndex) => {
                // Add "spec-list" class
                ul.classList.add('spec-list');
                totalUlsModified++;
                console.log(`Added "spec-list" to <ul> ${ulIndex + 1}`);
                
                // Add "spec-item" or "spec-header" class to immediate <li> children
                const immediateLiChildren = ul.querySelectorAll(':scope > li');
                console.log(`Found ${immediateLiChildren.length} immediate <li> children in <ul> ${ulIndex + 1}`);
                
                immediateLiChildren.forEach((li, liIndex) => {
                    // Check if this <li> has the "tmenu_item_display_header" class
                    if (li.classList.contains('tmenu_item_display_header')) {
                        li.classList.add('spec-header');
                        console.log(`Added "spec-header" to <li> ${liIndex + 1} (has tmenu_item_display_header)`);
                    } else {
                        li.classList.add('spec-item');
                        console.log(`Added "spec-item" to <li> ${liIndex + 1}`);
                    }
                    
                    // Check if this <li> contains an <a> with "Essentials" in the title
                    const essentialsLink = li.querySelector('a[title*="Essentials"]');
                    if (essentialsLink) {
                        li.classList.add('featured-list');
                        console.log(`Added "featured-list" to <li> ${liIndex + 1} (contains "Essentials" link: "${essentialsLink.getAttribute('title')}")`);
                    }
                    
                    totalLisModified++;
                });
            });
            
            totalProcessed++;
        });
    });
    
    console.log(`=== Results: Processed ${totalProcessed} instances, modified ${totalUlsModified} <ul>s and ${totalLisModified} <li>s ===`);
    return totalProcessed > 0;
}

// Function to set up efficient monitoring for class persistence
function setupContinuousMonitoring() {
    console.log('=== Setting up optimized monitoring ===');
    
    let processedCount = 0;
    let lastProcessTime = 0;
    const THROTTLE_DELAY = 100; // Throttle rapid-fire changes
    
    // Keep track of elements we're monitoring to avoid unnecessary checks
    const monitoredElements = new Set();
    
    function throttledAddMenuClasses() {
        const now = Date.now();
        if (now - lastProcessTime < THROTTLE_DELAY) {
            return; // Skip if called too frequently
        }
        lastProcessTime = now;
        
        console.log('Running throttled class reapplication');
        const result = addMenuClasses();
        if (result) {
            processedCount++;
        }
    }
    
    // More targeted MutationObserver - only watch menu containers
    const observer = new MutationObserver((mutations) => {
        let shouldCheck = false;
        
        mutations.forEach((mutation) => {
            // Only process if the change is within a menu container
            const isInMenu = mutation.target.closest('.tmenu_wrapper, .tmenu_submenu') !== null;
            if (!isInMenu) return;
            
            // Check for new nodes that might need processing
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.querySelector && 
                        (node.querySelector('a[title="Shop By Specifications"]') || 
                         node.querySelector('a[title*="Essentials"]') ||
                         node.classList?.contains('tmenu_submenu'))) {
                        shouldCheck = true;
                    }
                }
            });
            
            // Check for class attribute changes, but only on our monitored elements
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (monitoredElements.has(target)) {
                    console.log('Detected class change on monitored element, scheduling recheck');
                    shouldCheck = true;
                }
            }
        });
        
        if (shouldCheck) {
            throttledAddMenuClasses();
        }
    });
    
    // Only observe menu containers, not the entire document
    document.querySelectorAll('.tmenu_wrapper').forEach(wrapper => {
        observer.observe(wrapper, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    });
    
    // Fallback observer for new menu wrappers
    const documentObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && 
                    (node.classList?.contains('tmenu_wrapper') || node.querySelector?.('.tmenu_wrapper'))) {
                    console.log('New menu wrapper detected, adding to monitoring');
                    observer.observe(node, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['class']
                    });
                }
            });
        });
    });
    
    documentObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Much less frequent periodic check as final safety net
    const periodicCheck = setInterval(() => {
        // Only run if we haven't processed recently
        if (Date.now() - lastProcessTime > 5000) { // 5 seconds since last check
            const essentialsLinks = document.querySelectorAll('a[title*="Essentials"]');
            let needsCheck = false;
            
            // Quick check - just verify a few key elements
            essentialsLinks.forEach(essentialsLink => {
                const parentLi = essentialsLink.closest('li');
                if (parentLi && !parentLi.classList.contains('featured-list')) {
                    needsCheck = true;
                }
            });
            
            if (needsCheck) {
                console.log('Periodic safety check found missing classes');
                throttledAddMenuClasses();
            }
        }
    }, 5000); // Only check every 5 seconds as a safety net
    
    // Stop periodic checks after 5 minutes to avoid infinite running
    setTimeout(() => {
        clearInterval(periodicCheck);
        console.log('Stopped periodic safety checks after 5 minutes');
    }, 300000);
    
    console.log('Optimized monitoring active - watching menu containers only');
    
    return { observer, documentObserver, periodicCheck, monitoredElements };
}
function addMenuClasses() {
    console.log('=== Starting addMenuClasses ===');
    
    // Find all tmenu_wrapper containers
    const menuWrappers = document.querySelectorAll('.tmenu_wrapper');
    
    if (menuWrappers.length === 0) {
        return false;
    }
    
    let totalProcessed = 0;
    let totalUlsModified = 0;
    let totalLisModified = 0;
    
    // Get the monitoring set from our setup function (stored globally)
    const monitoredElements = window.menuClassMonitoredElements || new Set();
    
    // Process each menu wrapper
    menuWrappers.forEach((wrapper, wrapperIndex) => {
        // Find all "Shop By Specifications" links within this wrapper
        const shopBySpecsLinks = wrapper.querySelectorAll('a[title="Shop By Specifications"]');
        
        // Also find any links with "Essentials" in the title for featured-list processing
        const essentialsLinks = wrapper.querySelectorAll('a[title*="Essentials"]');
        
        // Process all "Essentials" parent menu items
        essentialsLinks.forEach((essentialsLink, essIndex) => {
            const parentLi = essentialsLink.closest('li');
            if (parentLi && !parentLi.classList.contains('featured-list')) {
                parentLi.classList.add('featured-list');
                monitoredElements.add(parentLi); // Track this element
                console.log(`Added "featured-list" to parent <li> of "${essentialsLink.getAttribute('title')}" link`);
                totalLisModified++;
            }
        });
        
        shopBySpecsLinks.forEach((link, linkIndex) => {
            console.log(`Processing "Shop By Specifications" link ${linkIndex + 1}`);
            
            // Get the parent <li> element
            const parentLi = link.closest('li');
            if (!parentLi) {
                return;
            }
            
            // Find all submenu <ul> elements
            const submenuUls = parentLi.querySelectorAll('ul');
            
            submenuUls.forEach((ul, ulIndex) => {
                // Add "spec-list" class
                if (!ul.classList.contains('spec-list')) {
                    ul.classList.add('spec-list');
                    monitoredElements.add(ul); // Track this element
                    totalUlsModified++;
                }
                
                // Add "spec-item" or "spec-header" class to immediate <li> children
                const immediateLiChildren = ul.querySelectorAll(':scope > li');
                
                immediateLiChildren.forEach((li, liIndex) => {
                    let classAdded = false;
                    
                    // Check if this <li> has the "tmenu_item_display_header" class
                    if (li.classList.contains('tmenu_item_display_header') && !li.classList.contains('spec-header')) {
                        li.classList.add('spec-header');
                        monitoredElements.add(li); // Track this element
                        classAdded = true;
                    } else if (!li.classList.contains('tmenu_item_display_header') && !li.classList.contains('spec-item')) {
                        li.classList.add('spec-item');
                        monitoredElements.add(li); // Track this element
                        classAdded = true;
                    }
                    
                    // Check if this <li> contains an <a> with "Essentials" in the title
                    const essentialsLink = li.querySelector('a[title*="Essentials"]');
                    if (essentialsLink && !li.classList.contains('featured-list')) {
                        li.classList.add('featured-list');
                        monitoredElements.add(li); // Track this element
                        console.log(`Added "featured-list" to <li> ${liIndex + 1} (contains "Essentials" link: "${essentialsLink.getAttribute('title')}")`);
                    }
                    
                    if (classAdded) {
                        totalLisModified++;
                    }
                });
            });
            
            totalProcessed++;
        });
    });
    
    // Store monitored elements globally for access by the observer
    window.menuClassMonitoredElements = monitoredElements;
    
    console.log(`=== Results: Processed ${totalProcessed} instances, modified ${totalUlsModified} <ul>s and ${totalLisModified} <li>s ===`);
    return totalProcessed > 0;
}
    
    // Stop periodic checks after 2 minutes to avoid infinite running
    setTimeout(() => {
        clearInterval(periodicCheck);
        console.log('Stopped periodic checking after 2 minutes');
    }, 120000);
    
    console.log('Continuous monitoring active - watching for "Shop By Specifications" links');
}

// Function to trigger submenus (in case they need to be activated)
function triggerSubmenus() {
    console.log('=== Attempting to trigger submenus ===');
    
    // Look for main menu items that might contain the "Shop By Specifications" submenu
    const potentialParents = document.querySelectorAll('a[title="Safety Air Guns"], .lv1-safety-air a, a[title*="Air Gun"]');
    console.log(`Found ${potentialParents.length} potential parent menu items`);
    
    potentialParents.forEach((parent, index) => {
        console.log(`Checking parent ${index + 1}: ${parent.getAttribute('title') || parent.textContent}`);
        
        // Try hovering to trigger submenu
        parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        parent.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        
        // Also try clicking if it has href="javascript:;"
        if (parent.getAttribute('href') === 'javascript:;') {
            parent.click();
        }
    });
    
    // Give a moment for submenus to load, then check
    setTimeout(() => {
        console.log('Checking for "Shop By Specifications" after triggering submenus...');
        addMenuClasses();
    }, 500);
}

// Main initialization
function initialize() {
    console.log('=== Initializing menu class script ===');
    
    // First, look for tmenu_wrapper
    const menuWrappers = document.querySelectorAll('.tmenu_wrapper');
    console.log(`Found ${menuWrappers.length} menu wrappers`);
    
    if (menuWrappers.length === 0) {
        console.log('No menu wrappers found, will wait...');
        setTimeout(initialize, 500);
        return;
    }
    
    // Try immediate processing
    console.log('Menu wrappers found, attempting immediate processing...');
    const immediateResult = addMenuClasses();
    
    if (!immediateResult) {
        console.log('No "Shop By Specifications" links found initially, trying to trigger submenus...');
        triggerSubmenus();
        
        // Start continuous monitoring for dynamically loaded content
        setupContinuousMonitoring();
    } else {
        console.log('Successfully processed immediately!');
        // Still set up monitoring in case there are more instances that load later
        setupContinuousMonitoring();
    }
}

// Start when DOM is ready
console.log('=== Menu class script loaded ===');
console.log('Document ready state:', document.readyState);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}