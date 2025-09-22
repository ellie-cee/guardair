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

// Function to set up continuous monitoring for dynamically loaded content
function setupContinuousMonitoring() {
    console.log('=== Setting up continuous monitoring ===');
    
    let processedCount = 0;
    
    // Set up MutationObserver to watch for any changes that might remove our classes
    const observer = new MutationObserver((mutations) => {
        let shouldCheck = false;
        
        mutations.forEach((mutation) => {
            // Check if new nodes were added that might contain our target links
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if the new node contains "Shop By Specifications" links or "Essentials" links
                    if (node.querySelector && 
                        (node.querySelector('a[title="Shop By Specifications"]') || 
                         node.querySelector('a[title*="Essentials"]') ||
                         node.querySelector('a[title*="Spec"]') ||
                         node.classList?.contains('tmenu_submenu') ||
                         node.querySelector('.tmenu_submenu'))) {
                        shouldCheck = true;
                    }
                }
            });
            
            // Check if attributes were modified (classes being removed/changed)
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.nodeType === Node.ELEMENT_NODE) {
                    // Check if this element should have our classes but doesn't
                    const essentialsLink = target.querySelector('a[title*="Essentials"]');
                    if (essentialsLink && !target.classList.contains('featured-list')) {
                        console.log('Detected featured-list class removal, will re-apply');
                        shouldCheck = true;
                    }
                    
                    // Check for spec-list, spec-header, spec-item class removals
                    if ((target.tagName === 'UL' && target.closest('li')?.querySelector('a[title="Shop By Specifications"]') && !target.classList.contains('spec-list')) ||
                        (target.tagName === 'LI' && target.closest('ul')?.classList.contains('spec-list') && 
                         !target.classList.contains('spec-header') && !target.classList.contains('spec-item'))) {
                        console.log('Detected spec class removal, will re-apply');
                        shouldCheck = true;
                    }
                }
            }
        });
        
        if (shouldCheck) {
            console.log('DOM changes detected that affect our classes - running addMenuClasses');
            const result = addMenuClasses();
            if (result) {
                processedCount++;
                console.log(`Successfully reprocessed content after DOM changes (attempt ${processedCount})`);
            }
        }
    });
    
    // Observe the entire document for changes, including attribute changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class'] // Only watch for class attribute changes
    });
    
    // Enhanced periodic check that also verifies class persistence
    const periodicCheck = setInterval(() => {
        const shopBySpecsLinks = document.querySelectorAll('a[title="Shop By Specifications"]');
        const essentialsLinks = document.querySelectorAll('a[title*="Essentials"]');
        
        if (shopBySpecsLinks.length > 0 || essentialsLinks.length > 0) {
            let needsProcessing = false;
            
            // Check Shop By Specifications links
            shopBySpecsLinks.forEach(link => {
                const parentLi = link.closest('li');
                if (parentLi) {
                    const uls = parentLi.querySelectorAll('ul');
                    uls.forEach(ul => {
                        if (!ul.classList.contains('spec-list')) {
                            needsProcessing = true;
                        }
                        // Also check if child <li> elements need processing
                        const childLis = ul.querySelectorAll(':scope > li');
                        childLis.forEach(li => {
                            if (!li.classList.contains('spec-header') && !li.classList.contains('spec-item')) {
                                needsProcessing = true;
                            }
                            // Check if "Essentials" links need the featured-list class
                            const essentialsLink = li.querySelector('a[title*="Essentials"]');
                            if (essentialsLink && !li.classList.contains('featured-list')) {
                                needsProcessing = true;
                            }
                        });
                    });
                }
            });
            
            // Check Essentials parent links
            essentialsLinks.forEach(essentialsLink => {
                const parentLi = essentialsLink.closest('li');
                if (parentLi && !parentLi.classList.contains('featured-list')) {
                    console.log(`Re-applying featured-list to "${essentialsLink.getAttribute('title')}" - class was removed`);
                    needsProcessing = true;
                }
            });
            
            if (needsProcessing) {
                console.log('Found missing classes during periodic check - reprocessing now');
                addMenuClasses();
            }
        }
    }, 500); // Check every 500ms for faster response to class removal
    
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