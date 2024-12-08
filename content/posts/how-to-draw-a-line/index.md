---
title: "Como desenhar uma linha?"
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

Refs:
https://www.youtube.com/watch?v=CceepU1vIKo&t=297s&ab_channel=NoBSCode

TODO:
Requisitos para a postagem:
- Ter feito artigos sobre:
- Vetores
- Trigonometria 


<div style="display: flex; justify-content: center; align-items: center; flex-direction: column; padding-bottom: 16px ">
    <canvas id="canvas"></canvas>
    <button id="resetBtn">Reiniciar</button>
</div>

<style>
    canvas {
        border: 1px solid black;
        width: 30%;
        image-rendering: pixelated;
    }
</style>

<script>
    const canvas = document.getElementById('canvas');
    const resetBtn = document.getElementById('resetBtn');
    const ctx = canvas.getContext('2d');
    canvas.width = 16
    canvas.height = 16

    const putPixel = (imgData, x, y, r, g, b, a) => {
        const index = parseInt((parseInt(x) + parseInt(y) * parseInt(imgData.width)) * 4);
        // const index = (x + (y) * imgData.width) * 4;
        imgData.data[index + 0] = r;
        imgData.data[index + 1] = g;
        imgData.data[index + 2] = b;
        imgData.data[index + 3] = a;
    }
    
    function getMouesPosition(e) {
        const mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
        const mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
        return {x: mouseX, y: mouseY};
    }

    const clear = (imgData) => {
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                putPixel(imgData, x, y, 0xFF, 0xFF, 0xFF, 0xFF);
            }
        }
    }

    const blackPixel  = (imgData, x, y) => putPixel(imgData, x, y, 0x55, 0x55, 0x55, 0x88);

    const line = (imgData, x1, y1, x2, y2) => {
      blackPixel(imgData, x1, y1)
      blackPixel(imgData, x2, y2)

      for(let x = 0; x <= x2; x++) {
        // c2 = a2 + b2
        let dx = x2 - x1
        let dy = y2 - y1
        let slope = dy/dx
        let y = x * slope
        blackPixel(imgData, x, y)
      }
    }

    // requestAnimationFrame(() => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      clear(imgData)

      line(imgData, 0, 0, 8, 8)
      line(imgData, 2, 5, 7, 12)
      ctx.putImageData(imgData, 0, 0);
    // })

    // canvas.addEventListener("mousemove", (e) => {
    //     const {x, y} = getMouesPosition(e);
    //     const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     putPixel(imgData, x, y, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255)
    //     ctx.putImageData(imgData, 0, 0);
    // })

    resetBtn.addEventListener("click", (e) => {
        const {x, y} = getMouesPosition(e);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        clear(imgData)
        ctx.putImageData(imgData, 0, 0);
    })

</script>