# 07-Float32Array [ X ] [ X ] [ ? ] [ X ] [ X ]

![Three.js Badge](https://img.shields.io/badge/Three.js-v0.152-blue)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 📦 Building a Cube Using Raw Vertex Coordinates (Three.js)

## About
This project demonstrates how to manually construct a 3D cube using only vertex coordinates, without relying on BoxGeometry or any predefined geometries from Three.js.

Instead of using high-level abstractions, the cube is defined face by face, using triangles composed of explicit vertex positions, stored in a Float32Array and passed to a BufferGeometry.

##🧠 Core Concept

- A cube is built from 6 faces.
- Each face is composed of 2 triangles.
- Each triangle is defined by 3 vertices.
- Total: 12 triangles → 36 vertex positions.

Even though many vertices share the same spatial coordinates, they are duplicated per face, which reflects how low-level geometry works in real-time graphics (and prepares the ground for normals, lighting, and indexed geometry).

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

