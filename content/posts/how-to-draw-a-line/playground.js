const createCanvas = (canvasID) => {
    const canvas = document.getElementById(canvasID);
    const ctx = canvas.getContext('2d');
    canvas.width = 16
    canvas.height = 16

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

const drawLine = (x0, y0, x1, y1) => {
    // p0
    c.color(0xFF, 0x00, 0x00, 0xFF)
    c.drawPixel(x0, y0)

    // p1..n-1
    c.color(0x00, 0x00, 0x00, 0xFF)
    for (let x = x0; x <= x1; x++) {
        c.drawPixel(x, y0)
    }

    // pN
    c.color(0x00, 0x00, 0xFF, 0xFF)
    c.drawPixel(x1, y1)
}

drawLine(2, 3, 5, 9)

c.refresh()