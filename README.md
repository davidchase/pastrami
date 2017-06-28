# pastrami
> Functional Cross-browser Clipboard Pastin' Never Tasted So Good :yum:

## Install
```sh
npm i -S pastrami
```

## Usage

```html
<div contenteditable class="paste">Paste Here</div>
<div class="results"></div>
```

```js
import { pastrami } from 'pastrami'

const run = pastrami(document.querySelector('.paste'))

run(img => document.querySelector('.results').appendChild(img))
```

## Why
- Needed a way to interact with [ClipboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent)
- Cross Browser Friendly

## Demo
https://goo.gl/tDTBVS

## API

### pastrami(element)

Returns a function with the result from clipboard

#### element
Type: `Element`

DOM Element with a contenteditable attribute


## Supported Browsers
- Chrome 59/61
- Firefox 53
- Safari 10
- IE 11/Edge

## TODO
- [ ] Add Tests
- [X] Test in IE
