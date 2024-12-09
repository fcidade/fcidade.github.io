---
title: "Arte ASCII"
date: 2024-11-25T18:53:44-03:00
draft: true # Set 'false' to publish
tableOfContents: true # Enable/disable Table of Contents
description: 'TODO'
categories:
  - Math
  - Game Dev
  - Graphics Programming
tags:
- Graphics Programming
- Javascript
- Image File Format
- File Format
- Canvas
---

https://www.youtube.com/watch?v=55iwMYv8tGI&pp=ygUSY29kaW5nIHRyYWluIGxpbmVz
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images


<div style="display: flex; justify-content: center; align-items: center; flex-direction: column; padding-bottom: 16px ">
    <h2>Imagem original</h2>
    <img src='./amanda.png' width="250" id="input_img">
    <h2>Arte em ASCII</h2>
    <code id="output"></code>
    <h2>Canvas Auxiliar</h2>
    <canvas id="canvas"></canvas>
    <canvas id="output_canvas"></canvas>
</div>

<style>
    canvas {
        border: 1px solid black;
        width: 30%;
        image-rendering: pixelated;
    }

    #output {
        /* width: 100%; */
        letter-spacing: normal;
        line-height: 1em;
        font-family: monospace;
        font-size: 6px;
        white-space: pre-line;
        /* transform: scale(.5) */
    }
</style>

<script src='./playground.js'></script>
