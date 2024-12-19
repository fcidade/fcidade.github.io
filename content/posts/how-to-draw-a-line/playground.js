const createCanvas = (canvasID) => {
    const canvas = document.getElementById(canvasID);
    const ctx = canvas.getContext('2d');
    canvas.width = 32
    canvas.height = 32

    let buffer = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let color = { r: 0x00, g: 0x00, b: 0x00, a: 0xFF }

    return {
        w() {
            return canvas.width
        },
        h() {
            return canvas.height
        },
        color(r, g, b, a) {
            color = { r, g, b, a }
        },
        drawPixel(x, y) {
            const startIndex = (Math.floor(x) + Math.floor(y) * canvas.width) * 4
            buffer.data[startIndex] = color.r
            buffer.data[startIndex + 1] = color.g
            buffer.data[startIndex + 2] = color.b
            buffer.data[startIndex + 3] = color.a
        },
        refresh() {
            ctx.putImageData(buffer, 0, 0);
        }
    }
}

const c = createCanvas('canvas')

// Drawing chessboard to make it easier to count pixels
c.color(0x00, 0x00, 0x00, 0x33)
for (let i = 0; i < c.w(); i++) {
    for (let j = 0; j < c.w(); j++) {
        if ((i + j) % 2 !== 0) {
            c.drawPixel(i, j)
        }
    }
}

c.color(0x00, 0x00, 0x00, 0xFF)

const drawLineFloat = (x0, y0, x1, y1) => {
    const dx = x1 - x0
    const dy = y1 - y0
    const step = Math.max(Math.abs(dx), Math.abs(dy))
    const stepX = dx / step
    const stepY = dy / step

    for (let i = 0; i <= step; i++) {
        const x =  Math.round(y0 + (i * stepX))
        const y = Math.round(y0 + (i * stepY))
        c.drawPixel(x, y)
    }
}

const drawLineInt = (x0, y0, x1, y1) => {
    // p0
    c.color(0xFF, 0x00, 0x00, 0xFF)
    c.drawPixel(x0, y0)

    // pN
    c.color(0x00, 0x00, 0xFF, 0x33)
    c.drawPixel(x1, y1)

    // p0 ... p1
    const dx = x1 - x0
    const dy = y1 - y0
    // if dx == 0 return ?
    const m = (dy / dx).toFixed(6) // TODO: Python, used in the video example, have a precision of 6, so i ill set it here for now because i dont want to be different from the video

    console.log({dx, dy, m});
    
    const coords = []
    c.color(0x00, 0x00, 0x00, 0xFF)
    for (let i = 0; i <= dx; i++) {
        const x = x0 + i
        const y = Math.floor(y0 + (x * m))
        coords.push({i, x, y: y0 + (x * m)})
        c.drawPixel(x, y)
    }
    console.table(coords)

}

const randX = () => {
    return Math.max(Math.min(Math.floor(Math.random() * c.w()), c.w() - 10), 10)
}

// p0 ... p1
// c.color(0x00, 0x00, 0x00, 0xFF)
// drawLineFloat(20, 20, 2, 2)
// drawLineFloat(2, 2, 13, 5)
for(let i = 0; i <= 4; i++) {
    // p0 ... p1
    c.color(Math.random() * 0xFF, Math.random() * 0xFF, Math.random() * 0xFF, 0xFF)
    drawLineFloat(randX(),randX(),randX(),randX())
}

c.refresh()