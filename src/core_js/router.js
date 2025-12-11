//处理 Morph 过渡//

import { wait } from '../utils/time';

export class Router {
  constructor() {
    this.morphLayer = document.getElementById('morph-layer');
    this.activePage = null;
    this.isAnimating = false;
  }

  /**
   * 核心过渡逻辑
   * @param {string} pageId - 目标页面ID
   * @param {string} color - 过渡颜色
   * @param {DOMRect} originRect - 点击元素的起始位置矩形
   */
  async navigateTo(pageId, color, originRect) {
    if (this.isAnimating || this.activePage === pageId) return;
    this.isAnimating = true;

    const targetPage = document.getElementById(`page-${pageId}`);
    
    // 1. 设置 Morph 层的初始状态 (即点击位置)
    this.setMorphInitialState(originRect, color);
    
    // 2. 强制重绘 (Reflow)
    void this.morphLayer.offsetWidth; 

    // 3. 执行展开动画
    this.morphLayer.classList.add('is-expanding'); // CSS 处理 transition
    
    // 4. 等待动画并切换内容
    await wait(600);
    targetPage.classList.add('active');
    this.activePage = targetPage;
    this.isAnimating = false;
  }

  async goBack() {
    if (!this.activePage) return;
    
    // 反向逻辑...
    this.activePage.classList.add('exit-mode');
    await wait(500);
    // ...
  }

  setMorphInitialState(rect, color) {
    Object.assign(this.morphLayer.style, {
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      backgroundColor: color,
      display: 'block'
    });
  }
}
