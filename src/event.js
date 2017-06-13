import { curry } from './func'

export const map = curry((fn, src, run) => src(event => run(fn(event))))
export const tap = curry((fn, src, run) => src(event => fn(event) || run(event)))
export const just = x => run => run(x)
export const chain = curry((fn, src, run) => src(event => fn(event)(run)))
export const filter = curry((pred, src, run) => src(event => pred(event) && run(event)))
export const delay = curry((ms, src, run) => src(event => setTimeout(() => run(event), ms)))
export const fromEvent = curry((type, elm, run) => elm.addEventListener(type, run))
