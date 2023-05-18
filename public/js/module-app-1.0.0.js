import Alpine from 'https://unpkg.com/alpinejs@3.x.x/dist/module.esm.js';

// Import autoAnimate (delete if not needed)
import autoAnimate from 'https://unpkg.com/@formkit/auto-animate';
Alpine.directive("autoanimate", (el, { expression }, { evaluate }) => {
    autoAnimate(el, evaluate(expression) || {});
});
// autoAnimate end

Alpine.data('lw', () => ({
    darkmode: false,
    
    toggle() {
        this.darkmode =! this.darkmode;
        document.documentElement.classList.toggle('dark');
    }
}));

Alpine.start();

