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
        drawPoint(x, y) {
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
            c.drawPoint(i, j)
        }
    }
}

c.color(0x00, 0x00, 0x00, 0xFF)

const drawLine = (x0, y0, x1, y1) => {
    // P0
    c.color(0xff, 0x00, 0x00, 0xaa)
    c.drawPoint(x0, y0)

    // In Between
    c.color(0x00, 0x00, 0xff, 0xaa)
    let y = y0
    let slope = (y1 - y0) / (x1 - x0) 
    console.log(slope)
    for (let x = x0; x <= x1; x++) {
        y += Math.floor(slope + 0.5)
        c.drawPoint(x, y)
    }

    // P1
    c.color(0x00, 0xff, 0x00, 0xaa)
    c.drawPoint(x1, y1)
}

drawLine(2, 2, 8, 8)
drawLine(8, 2, 13, 8)

c.refresh()