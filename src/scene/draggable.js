import { EventEmitter } from '../utils/EventEmitter'; // 事件发射器

export class DraggableItem extends EventEmitter {
  constructor(element) {
    super();
    this.el = element;
    this.state = {
      isDragging: false,
      initial: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
      z: parseFloat(element.dataset.z) || 0
    };
    
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener('mousedown', this.onDown.bind(this));
    // 使用 bind 确保 this 指向正确
  }

  onDown(e) {
    e.preventDefault();
    this.state.isDragging = true;
    this.state.initial.x = e.clientX - this.state.offset.x;
    this.state.initial.y = e.clientY - this.state.offset.y;
    
    // 通知 SceneManager 场景进入 "Modified" 状态
    this.emit('dragstart'); 
    
    document.addEventListener('mousemove', this.onMove.bind(this));
    document.addEventListener('mouseup', this.onUp.bind(this));
  }

  onMove(e) {
    if (!this.state.isDragging) return;
    
    const currentX = e.clientX - this.state.initial.x;
    const currentY = e.clientY - this.state.initial.y;
    
    this.state.offset = { x: currentX, y: currentY };
    this.updatePosition();
    
    // 特殊处理 Wireframe 的旋转逻辑
    if (this.el.classList.contains('wireframe-box')) {
      this.updateRotation(currentX, currentY);
    }
  }

  updatePosition() {
    // 使用 CSS Custom Properties 实现更好的性能
    this.el.style.setProperty('--tx', `calc(-50% + ${this.state.offset.x}px)`);
    this.el.style.setProperty('--ty', `calc(-50% + ${this.state.offset.y}px)`);
  }
  
  // ... onUp cleanup logic
}
