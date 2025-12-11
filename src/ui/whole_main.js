/*


import { DOM_IDS, CLASSES, COLOR_MAP } from './constants.js';
import { startDrag, resetScene, isSceneDragging } from './drag.js';
import { expandItem, goBack } from './navigation.js';

// --- Initialization and Event Delegation ---

document.addEventListener('DOMContentLoaded', () => {
    
    const scene = document.getElementById(DOM_IDS.SCENE);
    const cursor = document.getElementById(DOM_IDS.CURSOR);
    
    // --- 1. Cursor Movement ---
    document.addEventListener('mousemove', (e) => { 
        cursor.style.left = e.clientX + 'px'; 
        cursor.style.top = e.clientY + 'px'; 
    });

    // --- 2. Parallax / 3D Scene Rotation ---
    document.addEventListener('mousemove', (e) => {
        // Prevent parallax when dragging or when a subpage is active
        if (isSceneDragging() || document.getElementById(DOM_IDS.MORPH_LAYER).style.display === 'block') return;
        
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        scene.style.transform = `rotateX(${y * -20}deg) rotateY(${x * 20}deg)`;
    });

    // --- 3. Draggable Setup (Delegation) ---
    // 监听拖拽元素上的 mousedown 事件，开始拖拽逻辑
    document.querySelectorAll(`.${CLASSES.DRAGGABLE}`).forEach(el => {
        el.addEventListener('mousedown', (e) => startDrag(e, el));
    });

    // --- 4. Button and Navigation Delegation ---
    
    // Reset View Button
    document.querySelector('.reset-btn').addEventListener('click', resetScene);

    // Scroll Arrow
    document.querySelector('.scroll-arrow').addEventListener('click', () => {
        const target = document.getElementById(DOM_IDS.GRID_TARGET);
        target.scrollIntoView({ behavior: 'smooth' });
    });

    // Top Header Nav Dropdown (Delegation)
    document.querySelectorAll('.nav-dropdown .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // 从文本中提取页面 ID (例如 '01. ANALYSIS' -> 'analysis')
            const pageId = e.target.innerText.split('.')[1].trim().toLowerCase();
            const color = COLOR_MAP[pageId];
            expandItem(e.target, pageId, color);
        });
    });

    // Grid Section Items (Delegation)
    document.querySelectorAll('.grid-section .grid-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // 从 H3 标签中提取页面 ID (例如 <h3>ANALYSIS</h3> -> 'analysis')
            const pageId = item.querySelector('h3').innerText.toLowerCase();
            const color = COLOR_MAP[pageId];
            expandItem(item, pageId, color);
        });
    });
    
    // Global Back Button
    document.getElementById(DOM_IDS.GLOBAL_BACK_BTN).addEventListener('click', goBack);
});


*/
