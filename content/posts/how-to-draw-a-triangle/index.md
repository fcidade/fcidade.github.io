---
title: "Como desenhar um triângulo?"
date: 2024-12-19T17:22:00-03:00
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
<!-- 
TODO:
- Arrumar descricao
- Escrever o artigo
- Deixar bonitinho
- Criar um artigo separado para os outros métodos e usar esse aqui para focar no algoritimo de Bresenham
- Comentar que é bem famoso com desenvolvedores de rogue like

Refs:
https://www.youtube.com/watch?v=CceepU1vIKo&t=297s&ab_channel=NoBSCode
https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
[Bresenham's Line Algorithm - Rogue Like Development](https://web.archive.org/web/20200926144554/http://roguebasin.roguelikedevelopment.org/index.php?title=Bresenham%27s_Line_Algorithm)


<!-- Post -->

<!-- <div style="width: 100%;">
    <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVpZmJzanUyMmR5dm9ncGxydDN6dmxram5jOWpzd3Nubmd4amhzdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NKEt9elQ5cR68/giphy.webp" alt="alt text" style="width: 100%; max-width: 100%;">
</div> -->

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column; padding-bottom: 16px ">
    <canvas id="canvas"></canvas>
</div>

<style>
    canvas {
        border: 1px solid black;
        width: 30%;
        image-rendering: pixelated;
    }

    img {
        max-width: 200px;
    }
</style>

<script src='./playground.js'></script>