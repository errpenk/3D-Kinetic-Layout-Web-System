import { Draggable } from './Draggable.js';

export class SceneManager {
  constructor() {
    this.container = document.querySelector('.hero');
    this.scene = document.getElementById('scene');
    this.resetBtn = document.getElementById('reset-btn');
    this.items = [];
    
    this.init();
  }

  init() {
    // Initialize draggables
    document.querySelectorAll('.draggable').forEach(el => {
      this.items.push(new Draggable(el, this));
    });

    // Reset Event
    this.resetBtn.addEventListener('click', () => this.resetAll());

    // Parallax
    document.addEventListener('mousemove', (e) => this.handleParallax(e));
  }

  notifyDragStart() {
    this.container.classList.add('modified');
  }

  handleParallax(e) {
    // Disable parallax if draggable is active to avoid conflict
    if (this.items.some(i => i.state.isDragging)) return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    this.scene.style.transform = `rotateX(${y * -20}deg) rotateY(${x * 20}deg)`;
  }

  resetAll() {
    this.container.classList.remove('modified');
    this.items.forEach(item => item.reset());
  }
}
