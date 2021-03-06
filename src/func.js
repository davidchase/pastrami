const compose2 = (f, g) => x => f(g(x))

export const identity = x => x

export const curry = (fn, ...args) => args.length >= fn.length ? fn(...args) : curry.bind(null, fn, ...args)

export const compose = (...fns) => fns.reduce(compose2)

export const partial = (f, ...args) => (...rest) => f(...args, ...rest)

export const concat = (xs, arr) => [].concat(xs, arr)

export const converge = (f, g, h) => x => f(g(x), h(x))

export const intersection = (xs, arr) => xs
  .filter(x => arr.indexOf(x) > -1)
  .filter((x, i, og) => og.indexOf(x) === i)

export const notEmpty = xs => xs && xs.length > 0

export const head = xs => xs[0]

const slice = xs => [].slice.call(xs)
export const arrayFrom = Array.from || slice

export const toType = element => ({}).toString.call(element).match(/\s([a-zA-Z]+)/)[1]

export const chain = (fn, xs) => [].concat.apply([], xs.map(fn))

export const pathOr = curry((defaultVal, paths, obj) => !obj
            ? defaultVal
            : paths.length === 0 ? obj
            : pathOr(defaultVal, paths.slice(1), obj[paths[0]]))
