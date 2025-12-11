# 3D-Web-Project

This project transforms the classic Swiss style—grid discipline,modularity and structural—into an interactive digital environment. The interface is built around a 3D scene, draggable geometric forms, and smooth morphing transitions that turn static layout rules into dynamic behaviors. It explores how a visual system can behave, react, and communicate when translated into motion and interaction.
Also this project is a "vanilla" implementation: achieves motion graphics and 3D effects without using WebGL libraries (like Three.js) or animation libraries (like GSAP). By using CSS 3D (DOM-based 3D), this project achieves a high-performance, easy-implement, and low-dependency web approach.





# NEO-SWISS | Kinetic Lab


> **Deconstruct. Synthesize. Build.**
> An interactive exploration of International Typographic Style (Swiss Style) fused with modern web kinetics.

[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-1.70-CC6699?style=flat&logo=sass)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## ✦ Concept

**Neo-Swiss** is a digital interaction arts work that reimagines the rigid grids and objective clarity of Swiss Design through the lens of modern frontend interactivity.

It moves beyond static layouts to introduce **Time** and **Motion** as the fourth dimension of design. The project demonstrates advanced DOM manipulation, 3D CSS transforms, and state-driven page transitions without relying on heavy WebGL libraries like Three.js.

##  Key Features

*   **Interactive 3D Scene:** Custom-built parallax engine and drag-and-drop physics using vanilla JS and CSS Variables.
*   **Kinetic Typography:** Type that reacts to user input, velocity, and screen position.
*   **Seamless Transitions:** A custom `Router` class handling complex FLIP-like morphing animations between grid items and subpages.
*   **Modular Architecture:** Component-based file structure using SCSS modules and ES6 classes.
*   **Swiss Design System:** Strict adherence to a 12-column grid, typographic hierarchy, and limited color palette.

##  Design System

The visual language is strictly defined in `src/styles/abstract/_variables.scss`, adhering to the principles of International Typographic Style:

*   **Typography:** `Inter` for structural elements & `JetBrains Mono` for data/code blocks.
*   **Color Palette:**
    *   🔴 **Swiss Red** `(#FF2400)`: Emphasis & Action.
    *   🔵 **International Blue** `(#0033CC)`: Synthesis & Depth.
    *   🟡 **Signal Yellow** `(#FFD700)`: Highlights.
    *   ⚫ **Ink** `(#080808)` & ⚪ **Paper** `(#F2F2F2)`: High-contrast foundation.
*   **Motion:** A custom cubic-bezier easing `(0.16, 1, 0.3, 1)` is used globally to mimic the weight and friction of physical objects.

##  Engineering Highlights

###  The Morph Transition
The page transition is orchestrated by the `Router` class. Instead of simple opacity fades, it performs a complex FLIP-like animation:
1.  Captures the **bounding box** of the clicked element via `getBoundingClientRect`.
2.  Creates a temporary "Morph Layer" at those exact coordinates.
3.  Expands it to fullscreen using **hardware-accelerated CSS transforms**.
This ensures a seamless visual continuity at 60fps without layout thrashing.

###  Logic-less DOM
The HTML structure remains pure and semantic. All interaction logic (drag physics, hover states, routing) is attached dynamically via JavaScript modules (`Draggable.js`, `Navigation.js`), strictly adhering to the principle of **Separation of Concerns**.


##  License

This project is open source and available under the [MIT License](LICENSE).
