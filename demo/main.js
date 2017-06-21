import { pastrami } from '../src/index'

const element = document.querySelector('.paste')

const run = pastrami(element, ['image/png', 'image/tiff'])

run(img => document.querySelector('.results').appendChild(img))
