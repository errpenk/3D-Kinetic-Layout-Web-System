export class Navigation {
  constructor(router) {
    this.router = router;
    this.init();
  }

  init() {
    // Listen for anything with a 'data-route' attribute
    // This handles both the Header dropdown and the Grid items
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-route]');
      if (target) {
        const route = target.dataset.route;
        const color = target.dataset.color || '#080808';
        this.router.navigate(route, color, target);
      }
    });

    // Scroll Arrow
    const arrow = document.getElementById('scroll-arrow');
    arrow.addEventListener('click', () => {
      document.getElementById('grid-target').scrollIntoView({ behavior: 'smooth' });
    });
  }
}
