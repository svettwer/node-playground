const fs = require("fs");

const svgFile = fs.readFileSync("circle.svg")

const { createSVGWindow } = require('svgdom')
const window = createSVGWindow()
const document = window.document
const { SVG, registerWindow } = require('@svgdotjs/svg.js')

registerWindow(window, document)

const canvas = SVG(window.document.documentElement);
canvas.svg(svgFile)

let textContent = canvas.findOne("#importantText").text()
textContent+=" is great!"

canvas.findOne("#importantText").plain(textContent)

fs.writeFileSync("newCircle.svg", canvas.svg(), {encoding: "utf8"})