import { DOM_IDS, CLASSES } from './constants.js';

let isDragging = false;
let activeDragEl = null;
let startX, startY, initialX, initialY;
let clickThreshold = 5;

// --- Drag Core Logic ---
export function startDrag(e, el) {
    e.preventDefault();
    isDragging = true;
    activeDragEl = el;
    startX = e.clientX; startY = e.clientY;
    initialX = parseFloat(el.getAttribute('data-off-x')) || 0;
    initialY = parseFloat(el.getAttribute('data-off-y')) || 0;
    document.querySelector(`.${CLASSES.HERO}`).classList.add(CLASSES.MODIFIED);
    
    // Add listeners to the document for global movement tracking
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function dragMove(e) {
    if (!isDragging || !activeDragEl) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const currentX = initialX + dx;
    const currentY = initialY + dy;
    const z = activeDragEl.getAttribute('data-z');
    activeDragEl.style.setProperty('--tx', `calc(-50% + ${currentX}px)`);
    activeDragEl.style.setProperty('--ty', `calc(-50% + ${currentY}px)`);
    activeDragEl.style.setProperty('--tz', z + 'px');
    activeDragEl.setAttribute('data-current-x', currentX);
    activeDragEl.setAttribute('data-current-y', currentY);

    if (activeDragEl.classList.contains(CLASSES.WIREFRAME)) {
        const rotY = 45 + (currentX * 0.2);
        const rotX = (currentY * -0.2);
        activeDragEl.style.setProperty('--rotY', rotY + 'deg');
        activeDragEl.style.setProperty('--rotX', rotX + 'deg');
    }
}

function dragEnd(e) {
    if (!activeDragEl) return;
    const distMoved = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2));
    if (distMoved < clickThreshold) {
        triggerClickEffect(activeDragEl);
    } else {
        const curX = activeDragEl.getAttribute('data-current-x');
        const curY = activeDragEl.getAttribute('data-current-y');
        activeDragEl.setAttribute('data-off-x', curX);
        activeDragEl.setAttribute('data-off-y', curY);
    }
    isDragging = false; activeDragEl = null;
    document.removeEventListener('mousemove', dragMove); document.removeEventListener('mouseup', dragEnd);
}

function triggerClickEffect(el) {
    el.classList.remove('effect-ripple', 'effect-flip', 'effect-spin', 'effect-spacing', 'effect-morph');
    void el.offsetWidth; // Force reflow
    if (el.classList.contains(CLASSES.CIRCLE)) el.classList.add('effect-ripple');
    else if (el.classList.contains(CLASSES.SQUARE)) el.classList.add('effect-flip');
    else if (el.classList.contains(CLASSES.WIREFRAME)) el.classList.add('effect-spin');
    else if (el.classList.contains(CLASSES.ACCENT)) {
        el.classList.add('effect-morph');
    }
    else if (el.classList.contains(CLASSES.TEXT)) el.classList.add('effect-spacing');
}

export function resetScene() {
    const hero = document.querySelector(`.${CLASSES.HERO}`);
    hero.classList.remove(CLASSES.MODIFIED);
    const draggables = document.querySelectorAll(`.${CLASSES.DRAGGABLE}`);
    draggables.forEach(el => {
        el.classList.add(CLASSES.SMOOTH_RESET);
        el.style.setProperty('--tx', '-50%');
        el.style.setProperty('--ty', '-50%');
        el.style.removeProperty('--tz');
        el.style.removeProperty('--rotX'); el.style.removeProperty('--rotY');
        el.style.mixBlendMode = '';
        el.setAttribute('data-off-x', 0); el.setAttribute('data-off-y', 0);
        el.setAttribute('data-current-x', 0); el.setAttribute('data-current-y', 0);
        el.classList.remove('effect-ripple', 'effect-flip', 'effect-spin', 'effect-spacing', 'effect-morph');
    });
    // Remove smooth-reset class after animation completes
    setTimeout(() => { draggables.forEach(el => el.classList.remove(CLASSES.SMOOTH_RESET)); }, 800);
}

// Export the state for main.js to use in parallax calculation
export function isSceneDragging() {
    return isDragging;
}
