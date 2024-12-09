
const img = document.getElementById('input_img');
const output = document.getElementById('output');
const canvas = document.getElementById('canvas');
const output_canvas = document.getElementById('output_canvas');
const ctx = canvas.getContext('2d')
const ctx2 = output_canvas.getContext('2d')



const width = img.naturalWidth
const height = img.naturalHeight

output_canvas.width = canvas.width = 64
output_canvas.height = canvas.height = 64

const hRatio = canvas.width / img.naturalWidth;
const vRatio = canvas.height / img.naturalHeight;
const ratio = Math.min(hRatio, vRatio);
ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.naturalWidth * ratio, img.naturalHeight * ratio);

const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

const getGrayscale = (x, y) => {
    const index = (x + y * canvas.width) * 4
    const r = imgData[index]
    const g = imgData[index + 1]
    const b = imgData[index + 2]
    const a = imgData[index + 3] // not used
    return (r + g + b) / 3
}

const cdata = ctx2.getImageData(0, 0, output_canvas.width, output_canvas.height)

const putPixel = (x, y, scale) => {
    const startIndex = (Math.floor(x) + Math.floor(y) * output_canvas.width) * 4
    cdata.data[startIndex] = scale
    cdata.data[startIndex + 1] = scale
    cdata.data[startIndex + 2] = scale
    cdata.data[startIndex + 3] = 0xFF
}

const chars = "█▓▒░.."
const mapNumRange = (num, inMin, inMax, outMin, outMax) => {
    if (inMax - inMin === 0) {
        return 0
    }
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
let tmp = ''
for (let y = 0; y < output_canvas.height; y++) {
    for (let x = 0; x < output_canvas.width; x++) {
        const scale = getGrayscale(x, y)
        putPixel(x, y, scale)
        const i = Math.floor(mapNumRange(scale, 0, 0xff, 0, chars.length))
        const c = chars.charAt(i)
        if (c === undefined) {
            debugger
        }
        tmp += c
    }
    tmp += '\n'
    // break
}

output.innerHTML = tmp
ctx2.putImageData(cdata, 0, 0);