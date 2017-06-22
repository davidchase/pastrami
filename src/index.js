import { fromEvent, just, chain, tap, map, filter, delay } from './event'
import { compose, pathOr, converge, concat, intersection, notEmpty, head, identity } from './func'

const createImage = url => run => {
  if (!url) return
  const image = document.createElement('img')
  image.src = url
  image.onload = run
}

const clearHTML = element => {
  element.innerHTML = ''
}

const targetOrChild = event => event.target || head(event.childNodes)
const clearContent = target => target.parentNode ? clearHTML(target.parentNode) : null

const getFile = blob => blob.getAsFile()
const createObjURL = file => file && window.URL.createObjectURL(file)
const processFiles = compose(createImage, createObjURL, getFile, head, pathOr({}, ['clipboardData', 'items']))
const preventDefault = event => event.preventDefault()
const handleFiles = converge(identity, processFiles, preventDefault)
const checkForItems = compose(notEmpty, pathOr({}, ['clipboardData', 'items']))

const processPasteEvent =
      compose(
        tap(clearContent),
        filter(target => target.tagName === 'IMG'),
        map(targetOrChild),
        chain(event => checkForItems(event) ? handleFiles(event) : delay(1, just(event.target)))
      )

export const pastrami = elm => processPasteEvent(fromEvent('paste', elm))
