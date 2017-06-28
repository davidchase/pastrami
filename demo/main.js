import { pastrami } from '../src/index'

const element = document.querySelector('.paste')

const run = pastrami(element)

run(img => document.querySelector('.results').appendChild(img))
