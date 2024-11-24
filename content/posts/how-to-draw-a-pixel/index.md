---
title: "Como desenhar um pixel?"
date: 2024-11-24T13:44:54-03:00
draft: false # Set 'false' to publish
tableOfContents: false # Enable/disable Table of Contents
description: 'Explicando como um pixel é desenhado no canvas em Javascript'
categories:
- Graphics Programming
tags:
- Graphics Programming
- Javascript
- Image File Format
- File Format
- Canvas
---

<style>
    canvas {
        border: 1px solid black;
    }
</style>

Você já parou para pensar em como a informação de um pixel é armazenada e exibida na tela?
A curiosidade por trás disso sempre esteve na minha mente, e a verdade é que existem várias maneiras de realizar
esse processo,
cada uma com suas especificidades.

Neste post, vamos explorar uma forma simples de estruturar e renderizar pixels em um canvas em *Javascript*, e no
futuro abordar o mesmo em outros contextos, como *OpenGL*, *WebGL*, *DirectX*, *Vulkan*, etc.

**Obs:** Este post é apenas um exercício de aprendizado, não vamos nos preocupar com performance e pode não ser ideal
para ser utilizado em produção.

## O que é um pixel?
**TODO: Fazer desenho bonitinho**

Um pixel é a menor unidade de uma imagem em uma tela digital, representando um único ponto em uma grade. Ele define uma cor específica, normalmente através de combinações de vermelho, verde e azul (**RGB**). 

Além dos canais **RGB**, é comum também ser acompanhado por um canal de opacidade, chamado de Alpha (**A**) e costuma ser armazenado em uma estrutura de array unidimencional.

### Como os Pixels podem ser organizados com o uso de arrays:
**TODO: Fazer desenho bonitinho**

**Matriz / Array Bidimensional:** Uma imagem digital é composta por uma grade de pixels dispostos em linhas e colunas. Cada pixel pode ser facilmente acessado através de suas coordenadas (x, y).
**TODO: Fazer codigo**
```js
const canvas = [
    [...],
    [...],
    [...],
    ...
]
```

**TODO: Fazer desenho bonitinho**

**Array Unidimensional ou Bidimensional:** Embora visualmente pensemos em uma imagem como uma grade (bidimensional), os computadores frequentemente armazenam os dados de imagem em um array unidimensional.

Por exemplo, uma imagem de 10x10 pixels seria representada por um array de 100 elementos, onde cada grupo de quatro elementos consecutivos representam as componentes de cor de um pixel (vermelho, verde, azul e alfa).
**TODO: Fazer codigo**
```js
const canvas = [...]
```





---
Cálculo de Índices: O acesso eficiente aos pixels é realizado através de cálculos de índice. Para um pixel na posição (x, y), o índice correspondente em um array unidimensional pode ser calculado como:
[
\text{índice} = (y \times \text{largura da imagem} + x) \times 4
]
onde o multiplicador 4 representa os quatro canais de cor (RGBA).

Por que os Pixels são Organizados em um Array
Eficiência de Acesso: Usar arrays permite um acesso rápido e eficiente aos dados dos pixels. Isso é crucial para o desempenho em operações gráficas, como renderização, edição de imagens e animações.

Manipulação Simples: Arrays facilitam a manipulação dos dados, permitindo que você altere rapidamente a cor de um pixel ou aplique efeitos a uma área específica da imagem.

Integração com Algoritmos: Muitas operações e algoritmos em processamento de imagens (como filtros e transformações) são mais simples e eficientes quando os dados estão organizados em arrays, pois podem iterar facilmente sobre os elementos.

Compatibilidade com APIs Gráficas: Muitas bibliotecas e APIs gráficas, como o Canvas API no JavaScript, utilizam essa estrutura de dados para facilitar a comunicação e manipulação das imagens.

Em resumo, organizar pixels em um array oferece eficiência, simplicidade e compatibilidade com operações de processamento de imagens, tornando-o um método padrão na programação gráfica.


<canvas id="canvas"></canvas>

<script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = 'http://localhost:1313/img/pic_hu18354319333676688592.jpg';
    canvas.width = 200
    canvas.height = 200

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imgData);

    const putPixel = (x, y, r, g, b, a) => {
        const index = (x + y * imgData.width) * 4;
        imgData.data[index + 0] = r;
        imgData.data[index + 1] = g;
        imgData.data[index + 2] = b;
        imgData.data[index + 3] = a;
    }

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            putPixel(x, y, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        }
    }

    ctx.putImageData(imgData, 0, 0);

    console.log(new Date());
    console.log(imgData.data);

</script>