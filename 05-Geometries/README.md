# 05-Geometries ⬡


![Three.js Badge](https://img.shields.io/badge/Three.js-v0.152-blue)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-ES6-yellow)

## About
In this exercise, I explored how geometries work in Three.js by creating one entirely from scratch.
I generated a custom set of vertices using a Float32Array, which I then passed into a BufferGeometry. This approach allowed me to define the shape manually and understand how Three.js handles raw vertex data at a low level.

By building the geometry from zero, I learned that all 3D objects are essentially collections of vertices connected together to form faces, and these vertices are processed by Three.js shaders during rendering.
This exercise helped me deepen my understanding of how geometric data flows into the GPU and how custom shapes can be created without relying on built-in geometry primitives.

Here is the result of this exercise:  
![Geometrie Preview](05-Geometries.png)

## Technologies
- JavaScript (JS)  
- Three.js  
- Vite  
- VS Code  

## How to Run
1. Install dependencies:
2. npm install
3. npm run dev
4. Open the URL shown in the terminal



