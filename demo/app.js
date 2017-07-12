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





var converge = function (f, g, h) { return function (x) { return f(g(x), h(x)); }; };



var notEmpty = function (xs) { return xs && xs.length > 0; };

var head = function (xs) { return xs[0]; };

var toType = function (element) { return ({}).toString.call(element).match(/\s([a-zA-Z]+)/)[1]; };

var flatMap = function (fn, xs) { return [].concat.apply([], xs.map(fn)); };

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
  if (!url) { return }
  var image = document.createElement('img');
  image.src = url;
  image.onload = run;
}; };
var findElm = function (pred, xs) { return flatMap(function (x) { return x.children.length > 0 ? [].concat( x.children ) : x; }, xs).filter(pred)[0]; };
var isImage = function (element) { return toType(element) === 'HTMLImageElement'; };
var targetOrChild = function (event) { return event.target || findElm(isImage, [].concat( event.children )); };
var getFile = function (blob) { return blob.getAsFile(); };
var createObjURL = function (file) { return file && window.URL.createObjectURL(file); };
var processFiles = compose(createImage, createObjURL, getFile, head, pathOr({}, ['clipboardData', 'items']));
var preventDefault = function (event) { return event.preventDefault(); };
var handleFiles = converge(identity, processFiles, preventDefault);
var checkForItems = compose(notEmpty, pathOr({}, ['clipboardData', 'items']));

var processPasteEvent =
      compose(
        filter(isImage),
        map(targetOrChild),
        chain(function (event) { return checkForItems(event) ? handleFiles(event) : delay(1, just(event.currentTarget)); })
      );

var pastrami = function (elm) { return processPasteEvent(fromEvent('paste', elm)); };

var element = document.querySelector('.paste');

var run = pastrami(element);

run(function (img) { return document.querySelector('.results').appendChild(img); });

}());
