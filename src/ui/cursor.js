export class Cursor {
  constructor() {
    this.el = document.getElementById('cursor');
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.el.style.left = `${e.clientX}px`;
      this.el.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', () => this.el.classList.add('active'));
    document.addEventListener('mouseup', () => this.el.classList.remove('active'));
  }
}
