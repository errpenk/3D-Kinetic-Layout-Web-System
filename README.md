# 3D-Kinetic-Layout-Web-System

This project transforms the classic Swiss style—grid discipline,modularity and structural clarity—into an interactive digital environment. The interface is built around a 3D scene, draggable geometric forms, and smooth morphing transitions that turn static layout rules into dynamic behaviors. It explores how a visual system can behave, react, and communicate when translated into motion and interaction.
The most important point is, this project is a "vanilla" implementation: achieves motion graphics and 3D effects without using WebGL libraries (like Three.js) or animation libraries (like GSAP). By using CSS 3D (DOM-based 3D), this project achieves a high-performance, easy-implement, and low-dependency web approach.


A. Design Features
1. Spatial Interaction
   3D scene controlled by mouse movement.
   Draggable geometric elements.
   Real-time rotations and transformations during interaction.
   Click-triggered kinetic effects.

2. Grid-Based Visual Architecture
   Structural backdrop
   Grid logic informs spatial organization, alignment, rhythm
   Background elements

3. Dynamic Pages
   Each subpage uses unique animations such as typing, blur-entry, slide-up, velocity skew, or collapse during exit.



B. Design Principles
1. Structure over decoration
   The project treats grids, geometry, and typographic rules as the primary design material. Decoration emerges only from system logic.

2. Digital space
   Instead of flat layout, the design introduces:
     3D depth
     Interaction physics
     Time-based motion
     Morphing transformations



C. Key Technical Architecture
1. CSS 3D Transform
   Elements use:
     Perspective,transform-style: preserve-3d and translateZ & rotate
     Mouse-based scene rotation
     Dynamic transforms during drag events

2. Drag Interaction Layer
   The drag engine handles:
     pointer tracking
     movement deltas
     depth-aware positioning
     rotation behavior for specific elements
