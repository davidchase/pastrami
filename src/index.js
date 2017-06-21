import { fromEvent, just, chain, tap, map, filter, delay } from './event'
import { compose, pathOr, converge, concat, intersection, notEmpty, head, identity } from './func'

const createImage = url => run => {
  const image = document.createElement('img')
  image.src = url
  image.onload = run
}

const clearHTML = element => {
  element.innerHTML = ''
}

const targetOrChild = event => event.target || head(event.childNodes)
const clearContent = target => target.parentNode ? clearHTML(target.parentNode) : null

const getSafariTypes = pathOr([], ['types'])
const getChromeFFTypes = pathOr([], ['items', '0', 'type'])
const types = converge(concat, getSafariTypes, getChromeFFTypes)
const processFiles = event => createImage(window.URL.createObjectURL(head(event.clipboardData.items).getAsFile()))
const preventDefault = event => event.preventDefault()
const handleFiles = converge(identity, processFiles, preventDefault)

const processPasteEvent =
      compose(
        tap(clearContent),
        map(targetOrChild),
        chain(([event]) => notEmpty(event.clipboardData.items) ? handleFiles(event) : delay(1, just(event.target))),
        filter(([{ clipboardData }, allowedTypes]) => notEmpty(intersection(allowedTypes, types(clipboardData))))
      )

export const pastrami = (elm, mimeTypes = []) =>
             processPasteEvent(chain(event => just([event, mimeTypes]), fromEvent('paste', elm)))
