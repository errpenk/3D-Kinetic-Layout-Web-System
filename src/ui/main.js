// Styles Entry
import './styles/main.scss';

// Modules
import { SceneManager } from './js/scene/SceneManager.js';
import { Router } from './js/core/Router.js';
import { Cursor } from './js/ui/Cursor.js';
import { Navigation } from './js/ui/Navigation.js';

class App {
  constructor() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    console.log('NEO-SWISS LAB | Initializing...');
    
    this.cursor = new Cursor();
    this.router = new Router();
    this.scene = new SceneManager();
    this.nav = new Navigation(this.router);
    
    console.log('System Ready.');
  }
}

new App();
