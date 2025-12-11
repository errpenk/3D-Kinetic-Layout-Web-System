import '../styles/main.scss'; // 引入样式
import { SceneManager } from '../scene/SceneManager';
import { Router } from './Router';
import { Cursor } from '../components/Cursor';
import { Navigation } from '../components/Navigation';

class App {
  constructor() {
    this.init();
  }

  init() {
    console.log('%c NEO-SWISS LAB %c Initializing...', 'background:#000;color:#fff', 'color:#000');
    
    // 实例化各模块
    this.cursor = new Cursor();
    this.router = new Router();
    this.scene = new SceneManager(document.getElementById('scene'));
    this.nav = new Navigation(this.router);

    // 绑定全局事件
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // 处理类似 "Esc" 键返回等全局逻辑
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.router.goBack();
    });
  }
}

// 启动
new App();
