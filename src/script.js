// DRAG 
// INTERACTION
let isDragging = false;
let activeDragEl = null;
let startX, startY, initialX, initialY;
let clickThreshold = 5;

function startDrag(e, el) {
    e.preventDefault();
    isDragging = true;
    activeDragEl = el;
    startX = e.clientX; startY = e.clientY;
    initialX = parseFloat(el.getAttribute('data-off-x')) || 0;
    initialY = parseFloat(el.getAttribute('data-off-y')) || 0;
    document.querySelector('.hero').classList.add('modified');
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

    if (activeDragEl.classList.contains('wireframe-box')) {
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
    void el.offsetWidth;
    if (el.classList.contains('geo-circle')) el.classList.add('effect-ripple');
    else if (el.classList.contains('geo-square')) el.classList.add('effect-flip');
    else if (el.classList.contains('wireframe-box')) el.classList.add('effect-spin');
    else if (el.classList.contains('geo-accent')) {
        el.classList.add('effect-morph');
    }
    else if (el.classList.contains('geo-text')) el.classList.add('effect-spacing');
}

function resetScene() {
    const hero = document.querySelector('.hero');
    hero.classList.remove('modified');
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(el => {
        el.classList.add('smooth-reset');
        el.style.setProperty('--tx', '-50%');
        el.style.setProperty('--ty', '-50%');
        el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); el.style.removeProperty('--tz');
        el.style.removeProperty('--rotX'); el.style.removeProperty('--rotY');
        el.style.mixBlendMode = '';
        el.setAttribute('data-off-x', 0); el.setAttribute('data-off-y', 0);
        el.setAttribute('data-current-x', 0); el.setAttribute('data-current-y', 0);
        el.classList.remove('effect-ripple', 'effect-flip', 'effect-spin', 'effect-spacing', 'effect-morph');
    });
    setTimeout(() => { draggables.forEach(el => el.classList.remove('smooth-reset')); }, 800);
}

function scrollToGrid() {
    const target = document.getElementById('grid-target');
    target.scrollIntoView({ behavior: 'smooth' });
}

const scene = document.getElementById('scene');
document.addEventListener('mousemove', (e) => {
    if (isDragging || document.getElementById('morph-layer').style.display === 'block') return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    scene.style.transform = `rotateX(${y * -20}deg) rotateY(${x * 20}deg)`;
});

const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });





// NAVIGATION
// RETURN 
let activeSubpage = null;
let originRect = null;

function expandItem(element, pageId, color) {
    const morph = document.getElementById('morph-layer');
    const targetPage = document.getElementById(`page-${pageId}`);
    const returnBtn = document.getElementById('global-back-btn');

    if (activeSubpage) {
        if (activeSubpage === targetPage) return;
        activeSubpage.classList.remove('active');
        morph.style.backgroundColor = color;
        targetPage.classList.add('active');
        activeSubpage = targetPage;
    } else {
        if (element && element.getBoundingClientRect) {
            originRect = element.getBoundingClientRect();
        } else {
            originRect = { top: window.innerHeight/2, left: window.innerWidth/2, width: 0, height: 0 };
        }
        
        document.getElementById('header-meta').classList.add('hidden');
        returnBtn.classList.add('visible'); 

        targetPage.classList.remove('exit-mode');
        morph.style.transition = 'none'; 
        morph.style.display = 'block';
        morph.style.top = originRect.top + 'px'; 
        morph.style.left = originRect.left + 'px';
        morph.style.width = originRect.width + 'px'; 
        morph.style.height = originRect.height + 'px';
        morph.style.backgroundColor = color;

        void morph.offsetWidth;

        morph.style.transition = 'all 0.6s cubic-bezier(0.83, 0, 0.17, 1)';
        morph.style.top = '0'; morph.style.left = '0'; morph.style.width = '100vw'; morph.style.height = '100vh';

        setTimeout(() => { 
            targetPage.classList.add('active'); 
            activeSubpage = targetPage; 
        }, 400);
    }
}

function goBack() {
    if (!activeSubpage) return;
    const morph = document.getElementById('morph-layer');
    const returnBtn = document.getElementById('global-back-btn');
    
    document.getElementById('header-meta').classList.remove('hidden');
    returnBtn.classList.remove('visible'); 

    activeSubpage.classList.add('exit-mode');

    setTimeout(() => {
        activeSubpage.classList.remove('active');
        morph.style.backgroundColor = '#F2F2F2';

        if (originRect) {
            morph.style.top = originRect.top + 'px';
            morph.style.left = originRect.left + 'px';
            morph.style.width = originRect.width + 'px';
            morph.style.height = originRect.height + 'px';
        } else {
            morph.style.opacity = 0;
        }

        setTimeout(() => {
            morph.style.display = 'none';
            morph.style.opacity = 1; 
            activeSubpage.classList.remove('exit-mode');
            activeSubpage = null;
        }, 600);
    }, 500);
}