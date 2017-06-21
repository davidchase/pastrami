(function () {
'use strict';

var compose2 = function (f, g) { return function (x) { return f(g(x)); }; };

var identity = function (x) { return x; };

var curry = function (fn) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  return args.length >= fn.length ? fn.apply(void 0, args) : curry.bind.apply(curry, [ null, fn ].concat( args ));
};

var compose = function () {
  var fns = [], len = arguments.length;
  while ( len-- ) fns[ len ] = arguments[ len ];

  return fns.reduce(compose2);
};



var concat = function (xs, arr) { return [].concat(xs, arr); };

var converge = function (f, g, h) { return function (x) { return f(g(x), h(x)); }; };

var intersection = function (xs, arr) { return xs
  .filter(function (x) { return arr.indexOf(x) > -1; })
  .filter(function (x, i, og) { return og.indexOf(x) === i; }); };

var notEmpty = function (xs) { return xs && xs.length > 0; };

var head = function (xs) { return xs[0]; };

var pathOr = curry(function (defaultVal, paths, obj) { return !obj
            ? defaultVal
            : paths.length === 0 ? obj
            : pathOr(defaultVal, paths.slice(1), obj[paths[0]]); });

var map = curry(function (fn, src, run) { return src(function (event) { return run(fn(event)); }); });
var tap = curry(function (fn, src, run) { return src(function (event) { return fn(event) || run(event); }); });
var just = function (x) { return function (run) { return run(x); }; };
var chain = curry(function (fn, src, run) { return src(function (event) { return fn(event)(run); }); });
var filter = curry(function (pred, src, run) { return src(function (event) { return pred(event) && run(event); }); });
var delay = curry(function (ms, src, run) { return src(function (event) { return setTimeout(function () { return run(event); }, ms); }); });
var fromEvent = curry(function (type, elm, run) { return elm.addEventListener(type, run); });

var createImage = function (url) { return function (run) {
  var image = document.createElement('img');
  image.src = url;
  image.onload = run;
}; };

var clearHTML = function (element) {
  element.innerHTML = '';
};

var targetOrChild = function (event) { return event.target || head(event.childNodes); };
var clearContent = function (target) { return target.parentNode ? clearHTML(target.parentNode) : null; };

var getSafariTypes = pathOr([], ['types']);
var getChromeFFTypes = pathOr([], ['items', '0', 'type']);
var types = converge(concat, getSafariTypes, getChromeFFTypes);
var processFiles = function (event) { return createImage(window.URL.createObjectURL(head(event.clipboardData.items).getAsFile())); };
var preventDefault = function (event) { return event.preventDefault(); };
var handleFiles = converge(identity, processFiles, preventDefault);

var processPasteEvent =
      compose(
        tap(clearContent),
        map(targetOrChild),
        tap(console.log),
        chain(function (ref) {
          var event = ref[0];

          return notEmpty(event.clipboardData.items) ? handleFiles(event) : delay(1, just(event.target));
}),
        filter(function (ref) {
          var clipboardData = ref[0].clipboardData;
          var allowedTypes = ref[1];

          return notEmpty(intersection(allowedTypes, types(clipboardData)));
})
      );

var pastrami = function (elm, mimeTypes) {
               if ( mimeTypes === void 0 ) mimeTypes = [];

               return processPasteEvent(chain(function (event) { return just([event, mimeTypes]); }, fromEvent('paste', elm)));
};

var element = document.querySelector('.paste');

var run = pastrami(element, ['image/png', 'image/tiff']);

run(function (img) { return document.querySelector('.results').appendChild(img); });

}());
