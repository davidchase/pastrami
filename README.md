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

## API

### pastrami(element, [mime-types])

#### element
Type: `Element`

#### mime-types
Type: `array`

MIME types to be supported when pasting

## TODO
- [ ] Add Tests
