# 09 Debug User Interface 🎛


![Three.js Badge](https://img.shields.io/badge/Three.js-v0.152-blue)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-ES6-yellow)
![lil-gui Badge](https://img.shields.io/badge/lil--gui-v0.18-green)


## ✨ About
This project is an **interactive 3D scene** created with Three.js and **lil-gui**.  
It includes multiple objects:  

- 🌎 **Earth** – textured, can rotate and orbit  
- 🌳 **Wooden Cube** – can rotate and move freely  
- 🧊 **Rubik Cube** – can rotate and move freely  

The project demonstrates:  

- Control of object visibility and transformations using **lil-gui**  
- Autonomous animations using `elapsedTime` and delta timing  
- A structured, maintainable scene with multiple interactive objects


## 🎮 Features
- 🌎 **Earth Object**
  - Toggle visibility  
  - Rotation on its axis  
  - Orbital translation (around scene center)  
- 🌳 **Wooden Cube**
  - Rotation on X, Y, Z  
  - Move on X, Y, Z  
  - Reset to origin and default rotation  
- 🧊 **Rubik Cube**
  - Rotation on X, Y, Z  
  - Move on X, Y, Z  
  - Reset to origin and default rotation  
- 🎛 **Debug GUI**
  - Show/hide objects  
  - Enable/disable animations  
  - Reset object states  
- 📐 **Orbit Controls** – navigate scene with mouse  
- 🕹 **Keyboard Shortcuts**
  - `Delete` key toggles GUI visibility



Here is the result of this exercise:  
![Geometrie Preview](img/09-practica.gif)

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
