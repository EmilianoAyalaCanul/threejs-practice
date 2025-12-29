# 08-LIL-GUI

![Three.js Badge](https://img.shields.io/badge/Three.js-v0.152-blue)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-ES6-yellow)

## About

In this practice, I developed an interactive 3D scene using Three.js and implemented a Graphical User Interface (GUI) with lil-gui to control object transformations in real time. The scene consists of a textured sphere representing the Moon, rendered with a perspective camera and assisted by an axes helper for spatial reference.

One of the main objectives of this practice was to learn how to use a GUI as a debugging and control tool. Through the GUI, I was able to manipulate the sphere’s position and rotation on the X, Y, and Z axes using sliders. These controls were connected to an intermediate state object, which allowed the graphical interface to stay synchronized with the scene.

A key learning outcome was understanding how to properly update the GUI display when values are modified programmatically. By using the .listen() method and updating the controlled variables instead of directly modifying the 3D object, I successfully ensured that the GUI reflected changes instantly. This approach made it possible to implement a reset button that restores all position and rotation values to zero while also updating the graphical interface correctly.

Overall, this practice helped me understand the relationship between state management, render loops, and graphical user interfaces in Three.js. It also reinforced the importance of separating logic, state, and rendering to build scalable and maintainable interactive 3D applications.

Here is the result of this exercise:  
![LIL-GUI]()

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
