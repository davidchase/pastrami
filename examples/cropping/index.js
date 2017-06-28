import Croppr from 'croppr'
import { pastrami } from '../../src/index'

// helpers
const buildImage = (source, klass, crossOrigin = 'Anonymous') => {
   const image = document.createElement('img')
   image.crossOrigin = crossOrigin
   image.src = source
   image.classList.add(klass)
   return image
}

const applyNewImageToDOM = (newImg) => {
    document.querySelector(".results").innerHTML = ''
    document.querySelector(".results").appendChild(buildImage(newImg, 'canvased'))
}

const makeCanvas = (imgObj, newWidth, newHeight, startX, startY, ratio = 1) => () => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = newWidth
  canvas.height = newHeight

  context.drawImage(
    imgObj,
    startX,
    startY,
    newWidth * ratio,
    newHeight * ratio,
    0,
    0,
    newWidth,
    newHeight
  )

  applyNewImageToDOM(canvas.toDataURL())
}

const crop = function({ x, y, width, height }) {
    const src = buildImage(document.querySelector('.croppr-image').src)
     src.onload = makeCanvas(src, width, height, x, y)
}


// pasting
const element = document.querySelector('.paste')

const run = pastrami(element)

run(img => {
  const results = document.querySelector('.results')
  results.appendChild(img)
  const croppr = new Croppr(img, { startSize: [50, 50, '%'] })
  const cropBtn = document.querySelector('.crop')
  cropBtn.addEventListener('click', () => {
    crop(croppr.getValue())
    cropBtn.classList.add('hidden')
  })
})
