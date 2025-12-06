import { DOM_IDS, CLASSES, COLOR_MAP } from './constants.js';

let activeSubpage = null;
let originRect = null;

export function expandItem(element, pageId, color) {
    const morph = document.getElementById(DOM_IDS.MORPH_LAYER);
    const targetPage = document.getElementById(`page-${pageId}`);
    const headerMeta = document.getElementById(DOM_IDS.HEADER_META);
    const returnBtn = document.getElementById(DOM_IDS.GLOBAL_BACK_BTN);

    if (activeSubpage) {
        if (activeSubpage === targetPage) return;
        // 如果需要，可以在这里添加切换逻辑
        activeSubpage.classList.remove(CLASSES.ACTIVE);
        morph.style.backgroundColor = color;
        targetPage.classList.add(CLASSES.ACTIVE);
        activeSubpage = targetPage;
        return;
    } 
    
    // Initial expansion
    if (element && element.getBoundingClientRect) {
        originRect = element.getBoundingClientRect();
    } else {
        originRect = { top: window.innerHeight/2, left: window.innerWidth/2, width: 0, height: 0 };
    }
    
    headerMeta.classList.add(CLASSES.HIDDEN);
    returnBtn.classList.add(CLASSES.VISIBLE); 

    targetPage.classList.remove(CLASSES.EXIT_MODE);
    morph.style.transition = 'none'; 
    morph.style.display = 'block';
    morph.style.top = originRect.top + 'px'; 
    morph.style.left = originRect.left + 'px';
    morph.style.width = originRect.width + 'px'; 
    morph.style.height = originRect.height + 'px';
    morph.style.backgroundColor = color;

    // Force reflow
    void morph.offsetWidth;

    // Start transition
    morph.style.transition = 'all 0.6s cubic-bezier(0.83, 0, 0.17, 1)';
    morph.style.top = '0'; morph.style.left = '0'; morph.style.width = '100vw'; morph.style.height = '100vh';

    setTimeout(() => { 
        targetPage.classList.add(CLASSES.ACTIVE); 
        activeSubpage = targetPage; 
    }, 400);
}

export function goBack() {
    if (!activeSubpage) return;
    const morph = document.getElementById(DOM_IDS.MORPH_LAYER);
    const headerMeta = document.getElementById(DOM_IDS.HEADER_META);
    const returnBtn = document.getElementById(DOM_IDS.GLOBAL_BACK_BTN);
    
    headerMeta.classList.remove(CLASSES.HIDDEN);
    returnBtn.classList.remove(CLASSES.VISIBLE); 

    // Trigger exit animation on subpage content
    activeSubpage.classList.add(CLASSES.EXIT_MODE);

    setTimeout(() => {
        // Remove content visibility after its animation starts
        activeSubpage.classList.remove(CLASSES.ACTIVE);
        // Set morph layer back to initial paper color before shrinking
        morph.style.backgroundColor = COLOR_MAP.paper;

        if (originRect) {
            // Start morph shrink animation
            morph.style.top = originRect.top + 'px';
            morph.style.left = originRect.left + 'px';
            morph.style.width = originRect.width + 'px';
            morph.style.height = originRect.height + 'px';
        } else {
            // Fallback for no origin rect
            morph.style.opacity = 0;
        }

        setTimeout(() => {
            // Final cleanup after shrink animation
            morph.style.display = 'none';
            morph.style.opacity = 1; 
            activeSubpage.classList.remove(CLASSES.EXIT_MODE);
            activeSubpage = null;
        }, 600); // Wait for morph shrink (0.6s)
    }, 500); // Wait for subpage exit animation (0.5s)
}