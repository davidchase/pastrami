# pastrami
> Functional Cross-browser Clipboard Pastin' Never Tasted So Good :yum:

## Usage

```html
<div contenteditable class="paste">Paste Here</div>
<div class="results"></div>
```

```js
import { pastrami } from 'pastrami'

const run = pastrami(document.querySelector('.paste'), ['image/png'])

run(img => document.querySelector('.results').appendChild(img))
```

## Why
- Needed a way to interact with [ClipboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent)
- Cross Browser Friendly

## Demo
 https://goo.gl/M8SfWU

## API

### pastrami(element, [mime-types])

Returns a function with the result from clipboard

#### element
Type: `Element`

DOM Element with a contenteditable attribute

#### mime-types
Type: `array`

MIME types to be supported when pasting

## Supported Browsers
- Chrome 59/61
- Firefox 53
- Safari 10

## TODO
- [ ] Add Tests
- [ ] Test in IE
