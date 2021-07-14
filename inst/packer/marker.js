/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mark.js/dist/mark.js":
/*!*******************************************!*\
  !*** ./node_modules/mark.js/dist/mark.js ***!
  \*******************************************/
/***/ (function(module) {

/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var DOMIterator = function () {
  function DOMIterator(ctx) {
    var iframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var iframesTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;
    classCallCheck(this, DOMIterator);

    this.ctx = ctx;
    this.iframes = iframes;
    this.exclude = exclude;
    this.iframesTimeout = iframesTimeout;
  }

  createClass(DOMIterator, [{
    key: 'getContexts',
    value: function getContexts() {
      var ctx = void 0,
          filteredCtx = [];
      if (typeof this.ctx === 'undefined' || !this.ctx) {
        ctx = [];
      } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
        ctx = Array.prototype.slice.call(this.ctx);
      } else if (Array.isArray(this.ctx)) {
        ctx = this.ctx;
      } else if (typeof this.ctx === 'string') {
        ctx = Array.prototype.slice.call(document.querySelectorAll(this.ctx));
      } else {
        ctx = [this.ctx];
      }
      ctx.forEach(function (ctx) {
        var isDescendant = filteredCtx.filter(function (contexts) {
          return contexts.contains(ctx);
        }).length > 0;
        if (filteredCtx.indexOf(ctx) === -1 && !isDescendant) {
          filteredCtx.push(ctx);
        }
      });
      return filteredCtx;
    }
  }, {
    key: 'getIframeContents',
    value: function getIframeContents(ifr, successFn) {
      var errorFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      var doc = void 0;
      try {
        var ifrWin = ifr.contentWindow;
        doc = ifrWin.document;
        if (!ifrWin || !doc) {
          throw new Error('iframe inaccessible');
        }
      } catch (e) {
        errorFn();
      }
      if (doc) {
        successFn(doc);
      }
    }
  }, {
    key: 'isIframeBlank',
    value: function isIframeBlank(ifr) {
      var bl = 'about:blank',
          src = ifr.getAttribute('src').trim(),
          href = ifr.contentWindow.location.href;
      return href === bl && src !== bl && src;
    }
  }, {
    key: 'observeIframeLoad',
    value: function observeIframeLoad(ifr, successFn, errorFn) {
      var _this = this;

      var called = false,
          tout = null;
      var listener = function listener() {
        if (called) {
          return;
        }
        called = true;
        clearTimeout(tout);
        try {
          if (!_this.isIframeBlank(ifr)) {
            ifr.removeEventListener('load', listener);
            _this.getIframeContents(ifr, successFn, errorFn);
          }
        } catch (e) {
          errorFn();
        }
      };
      ifr.addEventListener('load', listener);
      tout = setTimeout(listener, this.iframesTimeout);
    }
  }, {
    key: 'onIframeReady',
    value: function onIframeReady(ifr, successFn, errorFn) {
      try {
        if (ifr.contentWindow.document.readyState === 'complete') {
          if (this.isIframeBlank(ifr)) {
            this.observeIframeLoad(ifr, successFn, errorFn);
          } else {
            this.getIframeContents(ifr, successFn, errorFn);
          }
        } else {
          this.observeIframeLoad(ifr, successFn, errorFn);
        }
      } catch (e) {
        errorFn();
      }
    }
  }, {
    key: 'waitForIframes',
    value: function waitForIframes(ctx, done) {
      var _this2 = this;

      var eachCalled = 0;
      this.forEachIframe(ctx, function () {
        return true;
      }, function (ifr) {
        eachCalled++;
        _this2.waitForIframes(ifr.querySelector('html'), function () {
          if (! --eachCalled) {
            done();
          }
        });
      }, function (handled) {
        if (!handled) {
          done();
        }
      });
    }
  }, {
    key: 'forEachIframe',
    value: function forEachIframe(ctx, filter, each) {
      var _this3 = this;

      var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

      var ifr = ctx.querySelectorAll('iframe'),
          open = ifr.length,
          handled = 0;
      ifr = Array.prototype.slice.call(ifr);
      var checkEnd = function checkEnd() {
        if (--open <= 0) {
          end(handled);
        }
      };
      if (!open) {
        checkEnd();
      }
      ifr.forEach(function (ifr) {
        if (DOMIterator.matches(ifr, _this3.exclude)) {
          checkEnd();
        } else {
          _this3.onIframeReady(ifr, function (con) {
            if (filter(ifr)) {
              handled++;
              each(con);
            }
            checkEnd();
          }, checkEnd);
        }
      });
    }
  }, {
    key: 'createIterator',
    value: function createIterator(ctx, whatToShow, filter) {
      return document.createNodeIterator(ctx, whatToShow, filter, false);
    }
  }, {
    key: 'createInstanceOnIframe',
    value: function createInstanceOnIframe(contents) {
      return new DOMIterator(contents.querySelector('html'), this.iframes);
    }
  }, {
    key: 'compareNodeIframe',
    value: function compareNodeIframe(node, prevNode, ifr) {
      var compCurr = node.compareDocumentPosition(ifr),
          prev = Node.DOCUMENT_POSITION_PRECEDING;
      if (compCurr & prev) {
        if (prevNode !== null) {
          var compPrev = prevNode.compareDocumentPosition(ifr),
              after = Node.DOCUMENT_POSITION_FOLLOWING;
          if (compPrev & after) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'getIteratorNode',
    value: function getIteratorNode(itr) {
      var prevNode = itr.previousNode();
      var node = void 0;
      if (prevNode === null) {
        node = itr.nextNode();
      } else {
        node = itr.nextNode() && itr.nextNode();
      }
      return {
        prevNode: prevNode,
        node: node
      };
    }
  }, {
    key: 'checkIframeFilter',
    value: function checkIframeFilter(node, prevNode, currIfr, ifr) {
      var key = false,
          handled = false;
      ifr.forEach(function (ifrDict, i) {
        if (ifrDict.val === currIfr) {
          key = i;
          handled = ifrDict.handled;
        }
      });
      if (this.compareNodeIframe(node, prevNode, currIfr)) {
        if (key === false && !handled) {
          ifr.push({
            val: currIfr,
            handled: true
          });
        } else if (key !== false && !handled) {
          ifr[key].handled = true;
        }
        return true;
      }
      if (key === false) {
        ifr.push({
          val: currIfr,
          handled: false
        });
      }
      return false;
    }
  }, {
    key: 'handleOpenIframes',
    value: function handleOpenIframes(ifr, whatToShow, eCb, fCb) {
      var _this4 = this;

      ifr.forEach(function (ifrDict) {
        if (!ifrDict.handled) {
          _this4.getIframeContents(ifrDict.val, function (con) {
            _this4.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb);
          });
        }
      });
    }
  }, {
    key: 'iterateThroughNodes',
    value: function iterateThroughNodes(whatToShow, ctx, eachCb, filterCb, doneCb) {
      var _this5 = this;

      var itr = this.createIterator(ctx, whatToShow, filterCb);
      var ifr = [],
          elements = [],
          node = void 0,
          prevNode = void 0,
          retrieveNodes = function retrieveNodes() {
        var _getIteratorNode = _this5.getIteratorNode(itr);

        prevNode = _getIteratorNode.prevNode;
        node = _getIteratorNode.node;

        return node;
      };
      while (retrieveNodes()) {
        if (this.iframes) {
          this.forEachIframe(ctx, function (currIfr) {
            return _this5.checkIframeFilter(node, prevNode, currIfr, ifr);
          }, function (con) {
            _this5.createInstanceOnIframe(con).forEachNode(whatToShow, function (ifrNode) {
              return elements.push(ifrNode);
            }, filterCb);
          });
        }
        elements.push(node);
      }
      elements.forEach(function (node) {
        eachCb(node);
      });
      if (this.iframes) {
        this.handleOpenIframes(ifr, whatToShow, eachCb, filterCb);
      }
      doneCb();
    }
  }, {
    key: 'forEachNode',
    value: function forEachNode(whatToShow, each, filter) {
      var _this6 = this;

      var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

      var contexts = this.getContexts();
      var open = contexts.length;
      if (!open) {
        done();
      }
      contexts.forEach(function (ctx) {
        var ready = function ready() {
          _this6.iterateThroughNodes(whatToShow, ctx, each, filter, function () {
            if (--open <= 0) {
              done();
            }
          });
        };
        if (_this6.iframes) {
          _this6.waitForIframes(ctx, ready);
        } else {
          ready();
        }
      });
    }
  }], [{
    key: 'matches',
    value: function matches(element, selector) {
      var selectors = typeof selector === 'string' ? [selector] : selector,
          fn = element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
      if (fn) {
        var match = false;
        selectors.every(function (sel) {
          if (fn.call(element, sel)) {
            match = true;
            return false;
          }
          return true;
        });
        return match;
      } else {
        return false;
      }
    }
  }]);
  return DOMIterator;
}();

var Mark$1 = function () {
  function Mark(ctx) {
    classCallCheck(this, Mark);

    this.ctx = ctx;
    this.ie = false;
    var ua = window.navigator.userAgent;
    if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
      this.ie = true;
    }
  }

  createClass(Mark, [{
    key: 'log',
    value: function log(msg) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'debug';

      var log = this.opt.log;
      if (!this.opt.debug) {
        return;
      }
      if ((typeof log === 'undefined' ? 'undefined' : _typeof(log)) === 'object' && typeof log[level] === 'function') {
        log[level]('mark.js: ' + msg);
      }
    }
  }, {
    key: 'escapeStr',
    value: function escapeStr(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
  }, {
    key: 'createRegExp',
    value: function createRegExp(str) {
      if (this.opt.wildcards !== 'disabled') {
        str = this.setupWildcardsRegExp(str);
      }
      str = this.escapeStr(str);
      if (Object.keys(this.opt.synonyms).length) {
        str = this.createSynonymsRegExp(str);
      }
      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
        str = this.setupIgnoreJoinersRegExp(str);
      }
      if (this.opt.diacritics) {
        str = this.createDiacriticsRegExp(str);
      }
      str = this.createMergedBlanksRegExp(str);
      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
        str = this.createJoinersRegExp(str);
      }
      if (this.opt.wildcards !== 'disabled') {
        str = this.createWildcardsRegExp(str);
      }
      str = this.createAccuracyRegExp(str);
      return str;
    }
  }, {
    key: 'createSynonymsRegExp',
    value: function createSynonymsRegExp(str) {
      var syn = this.opt.synonyms,
          sens = this.opt.caseSensitive ? '' : 'i',
          joinerPlaceholder = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? '\0' : '';
      for (var index in syn) {
        if (syn.hasOwnProperty(index)) {
          var value = syn[index],
              k1 = this.opt.wildcards !== 'disabled' ? this.setupWildcardsRegExp(index) : this.escapeStr(index),
              k2 = this.opt.wildcards !== 'disabled' ? this.setupWildcardsRegExp(value) : this.escapeStr(value);
          if (k1 !== '' && k2 !== '') {
            str = str.replace(new RegExp('(' + this.escapeStr(k1) + '|' + this.escapeStr(k2) + ')', 'gm' + sens), joinerPlaceholder + ('(' + this.processSynomyms(k1) + '|') + (this.processSynomyms(k2) + ')') + joinerPlaceholder);
          }
        }
      }
      return str;
    }
  }, {
    key: 'processSynomyms',
    value: function processSynomyms(str) {
      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
        str = this.setupIgnoreJoinersRegExp(str);
      }
      return str;
    }
  }, {
    key: 'setupWildcardsRegExp',
    value: function setupWildcardsRegExp(str) {
      str = str.replace(/(?:\\)*\?/g, function (val) {
        return val.charAt(0) === '\\' ? '?' : '\x01';
      });
      return str.replace(/(?:\\)*\*/g, function (val) {
        return val.charAt(0) === '\\' ? '*' : '\x02';
      });
    }
  }, {
    key: 'createWildcardsRegExp',
    value: function createWildcardsRegExp(str) {
      var spaces = this.opt.wildcards === 'withSpaces';
      return str.replace(/\u0001/g, spaces ? '[\\S\\s]?' : '\\S?').replace(/\u0002/g, spaces ? '[\\S\\s]*?' : '\\S*');
    }
  }, {
    key: 'setupIgnoreJoinersRegExp',
    value: function setupIgnoreJoinersRegExp(str) {
      return str.replace(/[^(|)\\]/g, function (val, indx, original) {
        var nextChar = original.charAt(indx + 1);
        if (/[(|)\\]/.test(nextChar) || nextChar === '') {
          return val;
        } else {
          return val + '\0';
        }
      });
    }
  }, {
    key: 'createJoinersRegExp',
    value: function createJoinersRegExp(str) {
      var joiner = [];
      var ignorePunctuation = this.opt.ignorePunctuation;
      if (Array.isArray(ignorePunctuation) && ignorePunctuation.length) {
        joiner.push(this.escapeStr(ignorePunctuation.join('')));
      }
      if (this.opt.ignoreJoiners) {
        joiner.push('\\u00ad\\u200b\\u200c\\u200d');
      }
      return joiner.length ? str.split(/\u0000+/).join('[' + joiner.join('') + ']*') : str;
    }
  }, {
    key: 'createDiacriticsRegExp',
    value: function createDiacriticsRegExp(str) {
      var sens = this.opt.caseSensitive ? '' : 'i',
          dct = this.opt.caseSensitive ? ['aàáảãạăằắẳẵặâầấẩẫậäåāą', 'AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ', 'cçćč', 'CÇĆČ', 'dđď', 'DĐĎ', 'eèéẻẽẹêềếểễệëěēę', 'EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ', 'iìíỉĩịîïī', 'IÌÍỈĨỊÎÏĪ', 'lł', 'LŁ', 'nñňń', 'NÑŇŃ', 'oòóỏõọôồốổỗộơởỡớờợöøō', 'OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ', 'rř', 'RŘ', 'sšśșş', 'SŠŚȘŞ', 'tťțţ', 'TŤȚŢ', 'uùúủũụưừứửữựûüůū', 'UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ', 'yýỳỷỹỵÿ', 'YÝỲỶỸỴŸ', 'zžżź', 'ZŽŻŹ'] : ['aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ', 'cçćčCÇĆČ', 'dđďDĐĎ', 'eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ', 'iìíỉĩịîïīIÌÍỈĨỊÎÏĪ', 'lłLŁ', 'nñňńNÑŇŃ', 'oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ', 'rřRŘ', 'sšśșşSŠŚȘŞ', 'tťțţTŤȚŢ', 'uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ', 'yýỳỷỹỵÿYÝỲỶỸỴŸ', 'zžżźZŽŻŹ'];
      var handled = [];
      str.split('').forEach(function (ch) {
        dct.every(function (dct) {
          if (dct.indexOf(ch) !== -1) {
            if (handled.indexOf(dct) > -1) {
              return false;
            }
            str = str.replace(new RegExp('[' + dct + ']', 'gm' + sens), '[' + dct + ']');
            handled.push(dct);
          }
          return true;
        });
      });
      return str;
    }
  }, {
    key: 'createMergedBlanksRegExp',
    value: function createMergedBlanksRegExp(str) {
      return str.replace(/[\s]+/gmi, '[\\s]+');
    }
  }, {
    key: 'createAccuracyRegExp',
    value: function createAccuracyRegExp(str) {
      var _this = this;

      var chars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~¡¿';
      var acc = this.opt.accuracy,
          val = typeof acc === 'string' ? acc : acc.value,
          ls = typeof acc === 'string' ? [] : acc.limiters,
          lsJoin = '';
      ls.forEach(function (limiter) {
        lsJoin += '|' + _this.escapeStr(limiter);
      });
      switch (val) {
        case 'partially':
        default:
          return '()(' + str + ')';
        case 'complementary':
          lsJoin = '\\s' + (lsJoin ? lsJoin : this.escapeStr(chars));
          return '()([^' + lsJoin + ']*' + str + '[^' + lsJoin + ']*)';
        case 'exactly':
          return '(^|\\s' + lsJoin + ')(' + str + ')(?=$|\\s' + lsJoin + ')';
      }
    }
  }, {
    key: 'getSeparatedKeywords',
    value: function getSeparatedKeywords(sv) {
      var _this2 = this;

      var stack = [];
      sv.forEach(function (kw) {
        if (!_this2.opt.separateWordSearch) {
          if (kw.trim() && stack.indexOf(kw) === -1) {
            stack.push(kw);
          }
        } else {
          kw.split(' ').forEach(function (kwSplitted) {
            if (kwSplitted.trim() && stack.indexOf(kwSplitted) === -1) {
              stack.push(kwSplitted);
            }
          });
        }
      });
      return {
        'keywords': stack.sort(function (a, b) {
          return b.length - a.length;
        }),
        'length': stack.length
      };
    }
  }, {
    key: 'isNumeric',
    value: function isNumeric(value) {
      return Number(parseFloat(value)) == value;
    }
  }, {
    key: 'checkRanges',
    value: function checkRanges(array) {
      var _this3 = this;

      if (!Array.isArray(array) || Object.prototype.toString.call(array[0]) !== '[object Object]') {
        this.log('markRanges() will only accept an array of objects');
        this.opt.noMatch(array);
        return [];
      }
      var stack = [];
      var last = 0;
      array.sort(function (a, b) {
        return a.start - b.start;
      }).forEach(function (item) {
        var _callNoMatchOnInvalid = _this3.callNoMatchOnInvalidRanges(item, last),
            start = _callNoMatchOnInvalid.start,
            end = _callNoMatchOnInvalid.end,
            valid = _callNoMatchOnInvalid.valid;

        if (valid) {
          item.start = start;
          item.length = end - start;
          stack.push(item);
          last = end;
        }
      });
      return stack;
    }
  }, {
    key: 'callNoMatchOnInvalidRanges',
    value: function callNoMatchOnInvalidRanges(range, last) {
      var start = void 0,
          end = void 0,
          valid = false;
      if (range && typeof range.start !== 'undefined') {
        start = parseInt(range.start, 10);
        end = start + parseInt(range.length, 10);
        if (this.isNumeric(range.start) && this.isNumeric(range.length) && end - last > 0 && end - start > 0) {
          valid = true;
        } else {
          this.log('Ignoring invalid or overlapping range: ' + ('' + JSON.stringify(range)));
          this.opt.noMatch(range);
        }
      } else {
        this.log('Ignoring invalid range: ' + JSON.stringify(range));
        this.opt.noMatch(range);
      }
      return {
        start: start,
        end: end,
        valid: valid
      };
    }
  }, {
    key: 'checkWhitespaceRanges',
    value: function checkWhitespaceRanges(range, originalLength, string) {
      var end = void 0,
          valid = true,
          max = string.length,
          offset = originalLength - max,
          start = parseInt(range.start, 10) - offset;
      start = start > max ? max : start;
      end = start + parseInt(range.length, 10);
      if (end > max) {
        end = max;
        this.log('End range automatically set to the max value of ' + max);
      }
      if (start < 0 || end - start < 0 || start > max || end > max) {
        valid = false;
        this.log('Invalid range: ' + JSON.stringify(range));
        this.opt.noMatch(range);
      } else if (string.substring(start, end).replace(/\s+/g, '') === '') {
        valid = false;
        this.log('Skipping whitespace only range: ' + JSON.stringify(range));
        this.opt.noMatch(range);
      }
      return {
        start: start,
        end: end,
        valid: valid
      };
    }
  }, {
    key: 'getTextNodes',
    value: function getTextNodes(cb) {
      var _this4 = this;

      var val = '',
          nodes = [];
      this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function (node) {
        nodes.push({
          start: val.length,
          end: (val += node.textContent).length,
          node: node
        });
      }, function (node) {
        if (_this4.matchesExclude(node.parentNode)) {
          return NodeFilter.FILTER_REJECT;
        } else {
          return NodeFilter.FILTER_ACCEPT;
        }
      }, function () {
        cb({
          value: val,
          nodes: nodes
        });
      });
    }
  }, {
    key: 'matchesExclude',
    value: function matchesExclude(el) {
      return DOMIterator.matches(el, this.opt.exclude.concat(['script', 'style', 'title', 'head', 'html']));
    }
  }, {
    key: 'wrapRangeInTextNode',
    value: function wrapRangeInTextNode(node, start, end) {
      var hEl = !this.opt.element ? 'mark' : this.opt.element,
          startNode = node.splitText(start),
          ret = startNode.splitText(end - start);
      var repl = document.createElement(hEl);
      repl.setAttribute('data-markjs', 'true');
      if (this.opt.className) {
        repl.setAttribute('class', this.opt.className);
      }
      repl.textContent = startNode.textContent;
      startNode.parentNode.replaceChild(repl, startNode);
      return ret;
    }
  }, {
    key: 'wrapRangeInMappedTextNode',
    value: function wrapRangeInMappedTextNode(dict, start, end, filterCb, eachCb) {
      var _this5 = this;

      dict.nodes.every(function (n, i) {
        var sibl = dict.nodes[i + 1];
        if (typeof sibl === 'undefined' || sibl.start > start) {
          if (!filterCb(n.node)) {
            return false;
          }
          var s = start - n.start,
              e = (end > n.end ? n.end : end) - n.start,
              startStr = dict.value.substr(0, n.start),
              endStr = dict.value.substr(e + n.start);
          n.node = _this5.wrapRangeInTextNode(n.node, s, e);
          dict.value = startStr + endStr;
          dict.nodes.forEach(function (k, j) {
            if (j >= i) {
              if (dict.nodes[j].start > 0 && j !== i) {
                dict.nodes[j].start -= e;
              }
              dict.nodes[j].end -= e;
            }
          });
          end -= e;
          eachCb(n.node.previousSibling, n.start);
          if (end > n.end) {
            start = n.end;
          } else {
            return false;
          }
        }
        return true;
      });
    }
  }, {
    key: 'wrapMatches',
    value: function wrapMatches(regex, ignoreGroups, filterCb, eachCb, endCb) {
      var _this6 = this;

      var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
      this.getTextNodes(function (dict) {
        dict.nodes.forEach(function (node) {
          node = node.node;
          var match = void 0;
          while ((match = regex.exec(node.textContent)) !== null && match[matchIdx] !== '') {
            if (!filterCb(match[matchIdx], node)) {
              continue;
            }
            var pos = match.index;
            if (matchIdx !== 0) {
              for (var i = 1; i < matchIdx; i++) {
                pos += match[i].length;
              }
            }
            node = _this6.wrapRangeInTextNode(node, pos, pos + match[matchIdx].length);
            eachCb(node.previousSibling);
            regex.lastIndex = 0;
          }
        });
        endCb();
      });
    }
  }, {
    key: 'wrapMatchesAcrossElements',
    value: function wrapMatchesAcrossElements(regex, ignoreGroups, filterCb, eachCb, endCb) {
      var _this7 = this;

      var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
      this.getTextNodes(function (dict) {
        var match = void 0;
        while ((match = regex.exec(dict.value)) !== null && match[matchIdx] !== '') {
          var start = match.index;
          if (matchIdx !== 0) {
            for (var i = 1; i < matchIdx; i++) {
              start += match[i].length;
            }
          }
          var end = start + match[matchIdx].length;
          _this7.wrapRangeInMappedTextNode(dict, start, end, function (node) {
            return filterCb(match[matchIdx], node);
          }, function (node, lastIndex) {
            regex.lastIndex = lastIndex;
            eachCb(node);
          });
        }
        endCb();
      });
    }
  }, {
    key: 'wrapRangeFromIndex',
    value: function wrapRangeFromIndex(ranges, filterCb, eachCb, endCb) {
      var _this8 = this;

      this.getTextNodes(function (dict) {
        var originalLength = dict.value.length;
        ranges.forEach(function (range, counter) {
          var _checkWhitespaceRange = _this8.checkWhitespaceRanges(range, originalLength, dict.value),
              start = _checkWhitespaceRange.start,
              end = _checkWhitespaceRange.end,
              valid = _checkWhitespaceRange.valid;

          if (valid) {
            _this8.wrapRangeInMappedTextNode(dict, start, end, function (node) {
              return filterCb(node, range, dict.value.substring(start, end), counter);
            }, function (node) {
              eachCb(node, range);
            });
          }
        });
        endCb();
      });
    }
  }, {
    key: 'unwrapMatches',
    value: function unwrapMatches(node) {
      var parent = node.parentNode;
      var docFrag = document.createDocumentFragment();
      while (node.firstChild) {
        docFrag.appendChild(node.removeChild(node.firstChild));
      }
      parent.replaceChild(docFrag, node);
      if (!this.ie) {
        parent.normalize();
      } else {
        this.normalizeTextNode(parent);
      }
    }
  }, {
    key: 'normalizeTextNode',
    value: function normalizeTextNode(node) {
      if (!node) {
        return;
      }
      if (node.nodeType === 3) {
        while (node.nextSibling && node.nextSibling.nodeType === 3) {
          node.nodeValue += node.nextSibling.nodeValue;
          node.parentNode.removeChild(node.nextSibling);
        }
      } else {
        this.normalizeTextNode(node.firstChild);
      }
      this.normalizeTextNode(node.nextSibling);
    }
  }, {
    key: 'markRegExp',
    value: function markRegExp(regexp, opt) {
      var _this9 = this;

      this.opt = opt;
      this.log('Searching with expression "' + regexp + '"');
      var totalMatches = 0,
          fn = 'wrapMatches';
      var eachCb = function eachCb(element) {
        totalMatches++;
        _this9.opt.each(element);
      };
      if (this.opt.acrossElements) {
        fn = 'wrapMatchesAcrossElements';
      }
      this[fn](regexp, this.opt.ignoreGroups, function (match, node) {
        return _this9.opt.filter(node, match, totalMatches);
      }, eachCb, function () {
        if (totalMatches === 0) {
          _this9.opt.noMatch(regexp);
        }
        _this9.opt.done(totalMatches);
      });
    }
  }, {
    key: 'mark',
    value: function mark(sv, opt) {
      var _this10 = this;

      this.opt = opt;
      var totalMatches = 0,
          fn = 'wrapMatches';

      var _getSeparatedKeywords = this.getSeparatedKeywords(typeof sv === 'string' ? [sv] : sv),
          kwArr = _getSeparatedKeywords.keywords,
          kwArrLen = _getSeparatedKeywords.length,
          sens = this.opt.caseSensitive ? '' : 'i',
          handler = function handler(kw) {
        var regex = new RegExp(_this10.createRegExp(kw), 'gm' + sens),
            matches = 0;
        _this10.log('Searching with expression "' + regex + '"');
        _this10[fn](regex, 1, function (term, node) {
          return _this10.opt.filter(node, kw, totalMatches, matches);
        }, function (element) {
          matches++;
          totalMatches++;
          _this10.opt.each(element);
        }, function () {
          if (matches === 0) {
            _this10.opt.noMatch(kw);
          }
          if (kwArr[kwArrLen - 1] === kw) {
            _this10.opt.done(totalMatches);
          } else {
            handler(kwArr[kwArr.indexOf(kw) + 1]);
          }
        });
      };

      if (this.opt.acrossElements) {
        fn = 'wrapMatchesAcrossElements';
      }
      if (kwArrLen === 0) {
        this.opt.done(totalMatches);
      } else {
        handler(kwArr[0]);
      }
    }
  }, {
    key: 'markRanges',
    value: function markRanges(rawRanges, opt) {
      var _this11 = this;

      this.opt = opt;
      var totalMatches = 0,
          ranges = this.checkRanges(rawRanges);
      if (ranges && ranges.length) {
        this.log('Starting to mark with the following ranges: ' + JSON.stringify(ranges));
        this.wrapRangeFromIndex(ranges, function (node, range, match, counter) {
          return _this11.opt.filter(node, range, match, counter);
        }, function (element, range) {
          totalMatches++;
          _this11.opt.each(element, range);
        }, function () {
          _this11.opt.done(totalMatches);
        });
      } else {
        this.opt.done(totalMatches);
      }
    }
  }, {
    key: 'unmark',
    value: function unmark(opt) {
      var _this12 = this;

      this.opt = opt;
      var sel = this.opt.element ? this.opt.element : '*';
      sel += '[data-markjs]';
      if (this.opt.className) {
        sel += '.' + this.opt.className;
      }
      this.log('Removal selector "' + sel + '"');
      this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function (node) {
        _this12.unwrapMatches(node);
      }, function (node) {
        var matchesSel = DOMIterator.matches(node, sel),
            matchesExclude = _this12.matchesExclude(node);
        if (!matchesSel || matchesExclude) {
          return NodeFilter.FILTER_REJECT;
        } else {
          return NodeFilter.FILTER_ACCEPT;
        }
      }, this.opt.done);
    }
  }, {
    key: 'opt',
    set: function set$$1(val) {
      this._opt = _extends({}, {
        'element': '',
        'className': '',
        'exclude': [],
        'iframes': false,
        'iframesTimeout': 5000,
        'separateWordSearch': true,
        'diacritics': true,
        'synonyms': {},
        'accuracy': 'partially',
        'acrossElements': false,
        'caseSensitive': false,
        'ignoreJoiners': false,
        'ignoreGroups': 0,
        'ignorePunctuation': [],
        'wildcards': 'disabled',
        'each': function each() {},
        'noMatch': function noMatch() {},
        'filter': function filter() {
          return true;
        },
        'done': function done() {},
        'debug': false,
        'log': window.console
      }, val);
    },
    get: function get$$1() {
      return this._opt;
    }
  }, {
    key: 'iterator',
    get: function get$$1() {
      return new DOMIterator(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout);
    }
  }]);
  return Mark;
}();

function Mark(ctx) {
  var _this = this;

  var instance = new Mark$1(ctx);
  this.mark = function (sv, opt) {
    instance.mark(sv, opt);
    return _this;
  };
  this.markRegExp = function (sv, opt) {
    instance.markRegExp(sv, opt);
    return _this;
  };
  this.markRanges = function (sv, opt) {
    instance.markRanges(sv, opt);
    return _this;
  };
  this.unmark = function (opt) {
    instance.unmark(opt);
    return _this;
  };
  return this;
}

return Mark;

})));


/***/ }),

/***/ "shiny":
/*!************************!*\
  !*** external "Shiny" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = Shiny;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./srcjs/exts/marker.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mark_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mark.js */ "./node_modules/mark.js/dist/mark.js");
/* harmony import */ var mark_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mark_js__WEBPACK_IMPORTED_MODULE_1__);



let markers = [];

Shiny.addCustomMessageHandler('marker-init', function(opts) {
	let instance = new (mark_js__WEBPACK_IMPORTED_MODULE_1___default())(opts.selector);
	markers[opts.name] = instance;
});

Shiny.addCustomMessageHandler('marker-mark', function(opts) {
  let done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  setTimeout(function(){
    markers[opts.name].mark(opts.keywords, opts.options)
  }, opts.delay);
});

Shiny.addCustomMessageHandler('marker-unmark', function(opts) {
  markers[opts.name].unmark(opts.options)
});

Shiny.addCustomMessageHandler('marker-mark-regex', function(opts) {
  let done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  let regex = new RegExp(opts.regex);
  setTimeout(function(){
    markers[opts.name].markRegExp(regex, opts.options);
  }, opts.delay);
});

Shiny.addCustomMessageHandler('marker-mark-ranges', function(opts) {
  let done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  markers[opts.name].markRanges(opts.ranges, opts.options)
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXJrZXIvLi9ub2RlX21vZHVsZXMvbWFyay5qcy9kaXN0L21hcmsuanMiLCJ3ZWJwYWNrOi8vbWFya2VyL2V4dGVybmFsIFwiU2hpbnlcIiIsIndlYnBhY2s6Ly9tYXJrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFya2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21hcmtlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFya2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFya2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFya2VyLy4vc3JjanMvZXh0cy9tYXJrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyxLQUE0RDtBQUM3RCxDQUFDLENBQ3lCO0FBQzFCLENBQUMscUJBQXFCOztBQUV0QjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7O0FBUUQ7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxxQ0FBcUMsRUFBRTtBQUN2QztBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsU0FBUztBQUNULGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM2lDRCx1Qjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOZTtBQUNZOztBQUUzQjs7QUFFQTtBQUNBLG9CQUFvQixnREFBSTtBQUN4QjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyxFIiwiZmlsZSI6Im1hcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBtYXJrLmpzIHY4LjExLjFcbiogaHR0cHM6Ly9tYXJranMuaW8vXG4qIENvcHlyaWdodCAoYykgMjAxNOKAkzIwMTgsIEp1bGlhbiBLw7xobmVsXG4qIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBodHRwczovL2dpdC5pby92d1RWbFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbC5NYXJrID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cblxuXG5cblxuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIERPTUl0ZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBET01JdGVyYXRvcihjdHgpIHtcbiAgICB2YXIgaWZyYW1lcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcbiAgICB2YXIgZXhjbHVkZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgdmFyIGlmcmFtZXNUaW1lb3V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiA1MDAwO1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIERPTUl0ZXJhdG9yKTtcblxuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuaWZyYW1lcyA9IGlmcmFtZXM7XG4gICAgdGhpcy5leGNsdWRlID0gZXhjbHVkZTtcbiAgICB0aGlzLmlmcmFtZXNUaW1lb3V0ID0gaWZyYW1lc1RpbWVvdXQ7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhET01JdGVyYXRvciwgW3tcbiAgICBrZXk6ICdnZXRDb250ZXh0cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbnRleHRzKCkge1xuICAgICAgdmFyIGN0eCA9IHZvaWQgMCxcbiAgICAgICAgICBmaWx0ZXJlZEN0eCA9IFtdO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmN0eCA9PT0gJ3VuZGVmaW5lZCcgfHwgIXRoaXMuY3R4KSB7XG4gICAgICAgIGN0eCA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChOb2RlTGlzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih0aGlzLmN0eCkpIHtcbiAgICAgICAgY3R4ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5jdHgpO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY3R4KSkge1xuICAgICAgICBjdHggPSB0aGlzLmN0eDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY3R4ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjdHggPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY3R4KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHggPSBbdGhpcy5jdHhdO1xuICAgICAgfVxuICAgICAgY3R4LmZvckVhY2goZnVuY3Rpb24gKGN0eCkge1xuICAgICAgICB2YXIgaXNEZXNjZW5kYW50ID0gZmlsdGVyZWRDdHguZmlsdGVyKGZ1bmN0aW9uIChjb250ZXh0cykge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0cy5jb250YWlucyhjdHgpO1xuICAgICAgICB9KS5sZW5ndGggPiAwO1xuICAgICAgICBpZiAoZmlsdGVyZWRDdHguaW5kZXhPZihjdHgpID09PSAtMSAmJiAhaXNEZXNjZW5kYW50KSB7XG4gICAgICAgICAgZmlsdGVyZWRDdHgucHVzaChjdHgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmaWx0ZXJlZEN0eDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRJZnJhbWVDb250ZW50cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldElmcmFtZUNvbnRlbnRzKGlmciwgc3VjY2Vzc0ZuKSB7XG4gICAgICB2YXIgZXJyb3JGbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZnVuY3Rpb24gKCkge307XG5cbiAgICAgIHZhciBkb2MgPSB2b2lkIDA7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgaWZyV2luID0gaWZyLmNvbnRlbnRXaW5kb3c7XG4gICAgICAgIGRvYyA9IGlmcldpbi5kb2N1bWVudDtcbiAgICAgICAgaWYgKCFpZnJXaW4gfHwgIWRvYykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWZyYW1lIGluYWNjZXNzaWJsZScpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yRm4oKTtcbiAgICAgIH1cbiAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgc3VjY2Vzc0ZuKGRvYyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaXNJZnJhbWVCbGFuaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzSWZyYW1lQmxhbmsoaWZyKSB7XG4gICAgICB2YXIgYmwgPSAnYWJvdXQ6YmxhbmsnLFxuICAgICAgICAgIHNyYyA9IGlmci5nZXRBdHRyaWJ1dGUoJ3NyYycpLnRyaW0oKSxcbiAgICAgICAgICBocmVmID0gaWZyLmNvbnRlbnRXaW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgIHJldHVybiBocmVmID09PSBibCAmJiBzcmMgIT09IGJsICYmIHNyYztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvYnNlcnZlSWZyYW1lTG9hZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9ic2VydmVJZnJhbWVMb2FkKGlmciwgc3VjY2Vzc0ZuLCBlcnJvckZuKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgY2FsbGVkID0gZmFsc2UsXG4gICAgICAgICAgdG91dCA9IG51bGw7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGNhbGxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBjbGVhclRpbWVvdXQodG91dCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfdGhpcy5pc0lmcmFtZUJsYW5rKGlmcikpIHtcbiAgICAgICAgICAgIGlmci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgbGlzdGVuZXIpO1xuICAgICAgICAgICAgX3RoaXMuZ2V0SWZyYW1lQ29udGVudHMoaWZyLCBzdWNjZXNzRm4sIGVycm9yRm4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGVycm9yRm4oKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbGlzdGVuZXIpO1xuICAgICAgdG91dCA9IHNldFRpbWVvdXQobGlzdGVuZXIsIHRoaXMuaWZyYW1lc1RpbWVvdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uSWZyYW1lUmVhZHknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbklmcmFtZVJlYWR5KGlmciwgc3VjY2Vzc0ZuLCBlcnJvckZuKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaWZyLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgIGlmICh0aGlzLmlzSWZyYW1lQmxhbmsoaWZyKSkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlSWZyYW1lTG9hZChpZnIsIHN1Y2Nlc3NGbiwgZXJyb3JGbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SWZyYW1lQ29udGVudHMoaWZyLCBzdWNjZXNzRm4sIGVycm9yRm4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9ic2VydmVJZnJhbWVMb2FkKGlmciwgc3VjY2Vzc0ZuLCBlcnJvckZuKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvckZuKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnd2FpdEZvcklmcmFtZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YWl0Rm9ySWZyYW1lcyhjdHgsIGRvbmUpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgZWFjaENhbGxlZCA9IDA7XG4gICAgICB0aGlzLmZvckVhY2hJZnJhbWUoY3R4LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSwgZnVuY3Rpb24gKGlmcikge1xuICAgICAgICBlYWNoQ2FsbGVkKys7XG4gICAgICAgIF90aGlzMi53YWl0Rm9ySWZyYW1lcyhpZnIucXVlcnlTZWxlY3RvcignaHRtbCcpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCEgLS1lYWNoQ2FsbGVkKSB7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sIGZ1bmN0aW9uIChoYW5kbGVkKSB7XG4gICAgICAgIGlmICghaGFuZGxlZCkge1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZm9yRWFjaElmcmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvckVhY2hJZnJhbWUoY3R4LCBmaWx0ZXIsIGVhY2gpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgZW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgdmFyIGlmciA9IGN0eC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKSxcbiAgICAgICAgICBvcGVuID0gaWZyLmxlbmd0aCxcbiAgICAgICAgICBoYW5kbGVkID0gMDtcbiAgICAgIGlmciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGlmcik7XG4gICAgICB2YXIgY2hlY2tFbmQgPSBmdW5jdGlvbiBjaGVja0VuZCgpIHtcbiAgICAgICAgaWYgKC0tb3BlbiA8PSAwKSB7XG4gICAgICAgICAgZW5kKGhhbmRsZWQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKCFvcGVuKSB7XG4gICAgICAgIGNoZWNrRW5kKCk7XG4gICAgICB9XG4gICAgICBpZnIuZm9yRWFjaChmdW5jdGlvbiAoaWZyKSB7XG4gICAgICAgIGlmIChET01JdGVyYXRvci5tYXRjaGVzKGlmciwgX3RoaXMzLmV4Y2x1ZGUpKSB7XG4gICAgICAgICAgY2hlY2tFbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpczMub25JZnJhbWVSZWFkeShpZnIsIGZ1bmN0aW9uIChjb24pIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIoaWZyKSkge1xuICAgICAgICAgICAgICBoYW5kbGVkKys7XG4gICAgICAgICAgICAgIGVhY2goY29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrRW5kKCk7XG4gICAgICAgICAgfSwgY2hlY2tFbmQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVJdGVyYXRvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yKGN0eCwgd2hhdFRvU2hvdywgZmlsdGVyKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKGN0eCwgd2hhdFRvU2hvdywgZmlsdGVyLCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlSW5zdGFuY2VPbklmcmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlT25JZnJhbWUoY29udGVudHMpIHtcbiAgICAgIHJldHVybiBuZXcgRE9NSXRlcmF0b3IoY29udGVudHMucXVlcnlTZWxlY3RvcignaHRtbCcpLCB0aGlzLmlmcmFtZXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBhcmVOb2RlSWZyYW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcGFyZU5vZGVJZnJhbWUobm9kZSwgcHJldk5vZGUsIGlmcikge1xuICAgICAgdmFyIGNvbXBDdXJyID0gbm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihpZnIpLFxuICAgICAgICAgIHByZXYgPSBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX1BSRUNFRElORztcbiAgICAgIGlmIChjb21wQ3VyciAmIHByZXYpIHtcbiAgICAgICAgaWYgKHByZXZOb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgdmFyIGNvbXBQcmV2ID0gcHJldk5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24oaWZyKSxcbiAgICAgICAgICAgICAgYWZ0ZXIgPSBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORztcbiAgICAgICAgICBpZiAoY29tcFByZXYgJiBhZnRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0SXRlcmF0b3JOb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SXRlcmF0b3JOb2RlKGl0cikge1xuICAgICAgdmFyIHByZXZOb2RlID0gaXRyLnByZXZpb3VzTm9kZSgpO1xuICAgICAgdmFyIG5vZGUgPSB2b2lkIDA7XG4gICAgICBpZiAocHJldk5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgbm9kZSA9IGl0ci5uZXh0Tm9kZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZSA9IGl0ci5uZXh0Tm9kZSgpICYmIGl0ci5uZXh0Tm9kZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJldk5vZGU6IHByZXZOb2RlLFxuICAgICAgICBub2RlOiBub2RlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NoZWNrSWZyYW1lRmlsdGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2hlY2tJZnJhbWVGaWx0ZXIobm9kZSwgcHJldk5vZGUsIGN1cnJJZnIsIGlmcikge1xuICAgICAgdmFyIGtleSA9IGZhbHNlLFxuICAgICAgICAgIGhhbmRsZWQgPSBmYWxzZTtcbiAgICAgIGlmci5mb3JFYWNoKGZ1bmN0aW9uIChpZnJEaWN0LCBpKSB7XG4gICAgICAgIGlmIChpZnJEaWN0LnZhbCA9PT0gY3Vycklmcikge1xuICAgICAgICAgIGtleSA9IGk7XG4gICAgICAgICAgaGFuZGxlZCA9IGlmckRpY3QuaGFuZGxlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5jb21wYXJlTm9kZUlmcmFtZShub2RlLCBwcmV2Tm9kZSwgY3VycklmcikpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZmFsc2UgJiYgIWhhbmRsZWQpIHtcbiAgICAgICAgICBpZnIucHVzaCh7XG4gICAgICAgICAgICB2YWw6IGN1cnJJZnIsXG4gICAgICAgICAgICBoYW5kbGVkOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ICE9PSBmYWxzZSAmJiAhaGFuZGxlZCkge1xuICAgICAgICAgIGlmcltrZXldLmhhbmRsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWZyLnB1c2goe1xuICAgICAgICAgIHZhbDogY3VycklmcixcbiAgICAgICAgICBoYW5kbGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVPcGVuSWZyYW1lcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU9wZW5JZnJhbWVzKGlmciwgd2hhdFRvU2hvdywgZUNiLCBmQ2IpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICBpZnIuZm9yRWFjaChmdW5jdGlvbiAoaWZyRGljdCkge1xuICAgICAgICBpZiAoIWlmckRpY3QuaGFuZGxlZCkge1xuICAgICAgICAgIF90aGlzNC5nZXRJZnJhbWVDb250ZW50cyhpZnJEaWN0LnZhbCwgZnVuY3Rpb24gKGNvbikge1xuICAgICAgICAgICAgX3RoaXM0LmNyZWF0ZUluc3RhbmNlT25JZnJhbWUoY29uKS5mb3JFYWNoTm9kZSh3aGF0VG9TaG93LCBlQ2IsIGZDYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2l0ZXJhdGVUaHJvdWdoTm9kZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpdGVyYXRlVGhyb3VnaE5vZGVzKHdoYXRUb1Nob3csIGN0eCwgZWFjaENiLCBmaWx0ZXJDYiwgZG9uZUNiKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIGl0ciA9IHRoaXMuY3JlYXRlSXRlcmF0b3IoY3R4LCB3aGF0VG9TaG93LCBmaWx0ZXJDYik7XG4gICAgICB2YXIgaWZyID0gW10sXG4gICAgICAgICAgZWxlbWVudHMgPSBbXSxcbiAgICAgICAgICBub2RlID0gdm9pZCAwLFxuICAgICAgICAgIHByZXZOb2RlID0gdm9pZCAwLFxuICAgICAgICAgIHJldHJpZXZlTm9kZXMgPSBmdW5jdGlvbiByZXRyaWV2ZU5vZGVzKCkge1xuICAgICAgICB2YXIgX2dldEl0ZXJhdG9yTm9kZSA9IF90aGlzNS5nZXRJdGVyYXRvck5vZGUoaXRyKTtcblxuICAgICAgICBwcmV2Tm9kZSA9IF9nZXRJdGVyYXRvck5vZGUucHJldk5vZGU7XG4gICAgICAgIG5vZGUgPSBfZ2V0SXRlcmF0b3JOb2RlLm5vZGU7XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9O1xuICAgICAgd2hpbGUgKHJldHJpZXZlTm9kZXMoKSkge1xuICAgICAgICBpZiAodGhpcy5pZnJhbWVzKSB7XG4gICAgICAgICAgdGhpcy5mb3JFYWNoSWZyYW1lKGN0eCwgZnVuY3Rpb24gKGN1cnJJZnIpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczUuY2hlY2tJZnJhbWVGaWx0ZXIobm9kZSwgcHJldk5vZGUsIGN1cnJJZnIsIGlmcik7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGNvbikge1xuICAgICAgICAgICAgX3RoaXM1LmNyZWF0ZUluc3RhbmNlT25JZnJhbWUoY29uKS5mb3JFYWNoTm9kZSh3aGF0VG9TaG93LCBmdW5jdGlvbiAoaWZyTm9kZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudHMucHVzaChpZnJOb2RlKTtcbiAgICAgICAgICAgIH0sIGZpbHRlckNiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50cy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgICAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBlYWNoQ2Iobm9kZSk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmlmcmFtZXMpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPcGVuSWZyYW1lcyhpZnIsIHdoYXRUb1Nob3csIGVhY2hDYiwgZmlsdGVyQ2IpO1xuICAgICAgfVxuICAgICAgZG9uZUNiKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZm9yRWFjaE5vZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JFYWNoTm9kZSh3aGF0VG9TaG93LCBlYWNoLCBmaWx0ZXIpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB2YXIgZG9uZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZnVuY3Rpb24gKCkge307XG5cbiAgICAgIHZhciBjb250ZXh0cyA9IHRoaXMuZ2V0Q29udGV4dHMoKTtcbiAgICAgIHZhciBvcGVuID0gY29udGV4dHMubGVuZ3RoO1xuICAgICAgaWYgKCFvcGVuKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIGNvbnRleHRzLmZvckVhY2goZnVuY3Rpb24gKGN0eCkge1xuICAgICAgICB2YXIgcmVhZHkgPSBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgICBfdGhpczYuaXRlcmF0ZVRocm91Z2hOb2Rlcyh3aGF0VG9TaG93LCBjdHgsIGVhY2gsIGZpbHRlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKC0tb3BlbiA8PSAwKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKF90aGlzNi5pZnJhbWVzKSB7XG4gICAgICAgICAgX3RoaXM2LndhaXRGb3JJZnJhbWVzKGN0eCwgcmVhZHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAnbWF0Y2hlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAgIHZhciBzZWxlY3RvcnMgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnID8gW3NlbGVjdG9yXSA6IHNlbGVjdG9yLFxuICAgICAgICAgIGZuID0gZWxlbWVudC5tYXRjaGVzIHx8IGVsZW1lbnQubWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xuICAgICAgICBzZWxlY3RvcnMuZXZlcnkoZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICAgIGlmIChmbi5jYWxsKGVsZW1lbnQsIHNlbCkpIHtcbiAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBET01JdGVyYXRvcjtcbn0oKTtcblxudmFyIE1hcmskMSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWFyayhjdHgpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBNYXJrKTtcblxuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuaWUgPSBmYWxzZTtcbiAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBpZiAodWEuaW5kZXhPZignTVNJRScpID4gLTEgfHwgdWEuaW5kZXhPZignVHJpZGVudCcpID4gLTEpIHtcbiAgICAgIHRoaXMuaWUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKE1hcmssIFt7XG4gICAga2V5OiAnbG9nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9nKG1zZykge1xuICAgICAgdmFyIGxldmVsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnZGVidWcnO1xuXG4gICAgICB2YXIgbG9nID0gdGhpcy5vcHQubG9nO1xuICAgICAgaWYgKCF0aGlzLm9wdC5kZWJ1Zykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoKHR5cGVvZiBsb2cgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGxvZykpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbG9nW2xldmVsXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsb2dbbGV2ZWxdKCdtYXJrLmpzOiAnICsgbXNnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlc2NhcGVTdHInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlc2NhcGVTdHIoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlUmVnRXhwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlUmVnRXhwKHN0cikge1xuICAgICAgaWYgKHRoaXMub3B0LndpbGRjYXJkcyAhPT0gJ2Rpc2FibGVkJykge1xuICAgICAgICBzdHIgPSB0aGlzLnNldHVwV2lsZGNhcmRzUmVnRXhwKHN0cik7XG4gICAgICB9XG4gICAgICBzdHIgPSB0aGlzLmVzY2FwZVN0cihzdHIpO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMub3B0LnN5bm9ueW1zKS5sZW5ndGgpIHtcbiAgICAgICAgc3RyID0gdGhpcy5jcmVhdGVTeW5vbnltc1JlZ0V4cChzdHIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0Lmlnbm9yZUpvaW5lcnMgfHwgdGhpcy5vcHQuaWdub3JlUHVuY3R1YXRpb24ubGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHRoaXMuc2V0dXBJZ25vcmVKb2luZXJzUmVnRXhwKHN0cik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHQuZGlhY3JpdGljcykge1xuICAgICAgICBzdHIgPSB0aGlzLmNyZWF0ZURpYWNyaXRpY3NSZWdFeHAoc3RyKTtcbiAgICAgIH1cbiAgICAgIHN0ciA9IHRoaXMuY3JlYXRlTWVyZ2VkQmxhbmtzUmVnRXhwKHN0cik7XG4gICAgICBpZiAodGhpcy5vcHQuaWdub3JlSm9pbmVycyB8fCB0aGlzLm9wdC5pZ25vcmVQdW5jdHVhdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgc3RyID0gdGhpcy5jcmVhdGVKb2luZXJzUmVnRXhwKHN0cik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHQud2lsZGNhcmRzICE9PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgIHN0ciA9IHRoaXMuY3JlYXRlV2lsZGNhcmRzUmVnRXhwKHN0cik7XG4gICAgICB9XG4gICAgICBzdHIgPSB0aGlzLmNyZWF0ZUFjY3VyYWN5UmVnRXhwKHN0cik7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZVN5bm9ueW1zUmVnRXhwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlU3lub255bXNSZWdFeHAoc3RyKSB7XG4gICAgICB2YXIgc3luID0gdGhpcy5vcHQuc3lub255bXMsXG4gICAgICAgICAgc2VucyA9IHRoaXMub3B0LmNhc2VTZW5zaXRpdmUgPyAnJyA6ICdpJyxcbiAgICAgICAgICBqb2luZXJQbGFjZWhvbGRlciA9IHRoaXMub3B0Lmlnbm9yZUpvaW5lcnMgfHwgdGhpcy5vcHQuaWdub3JlUHVuY3R1YXRpb24ubGVuZ3RoID8gJ1xcMCcgOiAnJztcbiAgICAgIGZvciAodmFyIGluZGV4IGluIHN5bikge1xuICAgICAgICBpZiAoc3luLmhhc093blByb3BlcnR5KGluZGV4KSkge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHN5bltpbmRleF0sXG4gICAgICAgICAgICAgIGsxID0gdGhpcy5vcHQud2lsZGNhcmRzICE9PSAnZGlzYWJsZWQnID8gdGhpcy5zZXR1cFdpbGRjYXJkc1JlZ0V4cChpbmRleCkgOiB0aGlzLmVzY2FwZVN0cihpbmRleCksXG4gICAgICAgICAgICAgIGsyID0gdGhpcy5vcHQud2lsZGNhcmRzICE9PSAnZGlzYWJsZWQnID8gdGhpcy5zZXR1cFdpbGRjYXJkc1JlZ0V4cCh2YWx1ZSkgOiB0aGlzLmVzY2FwZVN0cih2YWx1ZSk7XG4gICAgICAgICAgaWYgKGsxICE9PSAnJyAmJiBrMiAhPT0gJycpIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoJygnICsgdGhpcy5lc2NhcGVTdHIoazEpICsgJ3wnICsgdGhpcy5lc2NhcGVTdHIoazIpICsgJyknLCAnZ20nICsgc2VucyksIGpvaW5lclBsYWNlaG9sZGVyICsgKCcoJyArIHRoaXMucHJvY2Vzc1N5bm9teW1zKGsxKSArICd8JykgKyAodGhpcy5wcm9jZXNzU3lub215bXMoazIpICsgJyknKSArIGpvaW5lclBsYWNlaG9sZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncHJvY2Vzc1N5bm9teW1zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc1N5bm9teW1zKHN0cikge1xuICAgICAgaWYgKHRoaXMub3B0Lmlnbm9yZUpvaW5lcnMgfHwgdGhpcy5vcHQuaWdub3JlUHVuY3R1YXRpb24ubGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHRoaXMuc2V0dXBJZ25vcmVKb2luZXJzUmVnRXhwKHN0cik7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NldHVwV2lsZGNhcmRzUmVnRXhwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0dXBXaWxkY2FyZHNSZWdFeHAoc3RyKSB7XG4gICAgICBzdHIgPSBzdHIucmVwbGFjZSgvKD86XFxcXCkqXFw/L2csIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5jaGFyQXQoMCkgPT09ICdcXFxcJyA/ICc/JyA6ICdcXHgwMSc7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvKD86XFxcXCkqXFwqL2csIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5jaGFyQXQoMCkgPT09ICdcXFxcJyA/ICcqJyA6ICdcXHgwMic7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVXaWxkY2FyZHNSZWdFeHAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVXaWxkY2FyZHNSZWdFeHAoc3RyKSB7XG4gICAgICB2YXIgc3BhY2VzID0gdGhpcy5vcHQud2lsZGNhcmRzID09PSAnd2l0aFNwYWNlcyc7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcdTAwMDEvZywgc3BhY2VzID8gJ1tcXFxcU1xcXFxzXT8nIDogJ1xcXFxTPycpLnJlcGxhY2UoL1xcdTAwMDIvZywgc3BhY2VzID8gJ1tcXFxcU1xcXFxzXSo/JyA6ICdcXFxcUyonKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXR1cElnbm9yZUpvaW5lcnNSZWdFeHAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXR1cElnbm9yZUpvaW5lcnNSZWdFeHAoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1teKHwpXFxcXF0vZywgZnVuY3Rpb24gKHZhbCwgaW5keCwgb3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIG5leHRDaGFyID0gb3JpZ2luYWwuY2hhckF0KGluZHggKyAxKTtcbiAgICAgICAgaWYgKC9bKHwpXFxcXF0vLnRlc3QobmV4dENoYXIpIHx8IG5leHRDaGFyID09PSAnJykge1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbCArICdcXDAnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVKb2luZXJzUmVnRXhwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlSm9pbmVyc1JlZ0V4cChzdHIpIHtcbiAgICAgIHZhciBqb2luZXIgPSBbXTtcbiAgICAgIHZhciBpZ25vcmVQdW5jdHVhdGlvbiA9IHRoaXMub3B0Lmlnbm9yZVB1bmN0dWF0aW9uO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaWdub3JlUHVuY3R1YXRpb24pICYmIGlnbm9yZVB1bmN0dWF0aW9uLmxlbmd0aCkge1xuICAgICAgICBqb2luZXIucHVzaCh0aGlzLmVzY2FwZVN0cihpZ25vcmVQdW5jdHVhdGlvbi5qb2luKCcnKSkpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0Lmlnbm9yZUpvaW5lcnMpIHtcbiAgICAgICAgam9pbmVyLnB1c2goJ1xcXFx1MDBhZFxcXFx1MjAwYlxcXFx1MjAwY1xcXFx1MjAwZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGpvaW5lci5sZW5ndGggPyBzdHIuc3BsaXQoL1xcdTAwMDArLykuam9pbignWycgKyBqb2luZXIuam9pbignJykgKyAnXSonKSA6IHN0cjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVEaWFjcml0aWNzUmVnRXhwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlRGlhY3JpdGljc1JlZ0V4cChzdHIpIHtcbiAgICAgIHZhciBzZW5zID0gdGhpcy5vcHQuY2FzZVNlbnNpdGl2ZSA/ICcnIDogJ2knLFxuICAgICAgICAgIGRjdCA9IHRoaXMub3B0LmNhc2VTZW5zaXRpdmUgPyBbJ2HDoMOh4bqjw6PhuqHEg+G6seG6r+G6s+G6teG6t8Oi4bqn4bql4bqp4bqr4bqtw6TDpcSBxIUnLCAnQcOAw4HhuqLDg+G6oMSC4bqw4bqu4bqy4bq04bq2w4LhuqbhuqThuqjhuqrhuqzDhMOFxIDEhCcsICdjw6fEh8SNJywgJ0PDh8SGxIwnLCAnZMSRxI8nLCAnRMSQxI4nLCAnZcOow6nhurvhur3hurnDquG7geG6v+G7g+G7heG7h8OrxJvEk8SZJywgJ0XDiMOJ4bq64bq84bq4w4rhu4Dhur7hu4Lhu4Thu4bDi8SaxJLEmCcsICdpw6zDreG7icSp4buLw67Dr8SrJywgJ0nDjMON4buIxKjhu4rDjsOPxKonLCAnbMWCJywgJ0zFgScsICduw7HFiMWEJywgJ07DkcWHxYMnLCAnb8Oyw7Phu4/DteG7jcO04buT4buR4buV4buX4buZxqHhu5/hu6Hhu5vhu53hu6PDtsO4xY0nLCAnT8OSw5Phu47DleG7jMOU4buS4buQ4buU4buW4buYxqDhu57hu6Dhu5rhu5zhu6LDlsOYxYwnLCAncsWZJywgJ1LFmCcsICdzxaHFm8iZxZ8nLCAnU8WgxZrImMWeJywgJ3TFpcibxaMnLCAnVMWkyJrFoicsICd1w7nDuuG7p8Wp4bulxrDhu6vhu6nhu63hu6/hu7HDu8O8xa/FqycsICdVw5nDmuG7psWo4bukxq/hu6rhu6jhu6zhu67hu7DDm8Ocxa7FqicsICd5w73hu7Phu7fhu7nhu7XDvycsICdZw53hu7Lhu7bhu7jhu7TFuCcsICd6xb7FvMW6JywgJ1rFvcW7xbknXSA6IFsnYcOgw6HhuqPDo+G6ocSD4bqx4bqv4bqz4bq14bq3w6LhuqfhuqXhuqnhuqvhuq3DpMOlxIHEhUHDgMOB4bqiw4PhuqDEguG6sOG6ruG6suG6tOG6tsOC4bqm4bqk4bqo4bqq4bqsw4TDhcSAxIQnLCAnY8OnxIfEjUPDh8SGxIwnLCAnZMSRxI9ExJDEjicsICdlw6jDqeG6u+G6veG6ucOq4buB4bq/4buD4buF4buHw6vEm8STxJlFw4jDieG6uuG6vOG6uMOK4buA4bq+4buC4buE4buGw4vEmsSSxJgnLCAnacOsw63hu4nEqeG7i8Ouw6/Eq0nDjMON4buIxKjhu4rDjsOPxKonLCAnbMWCTMWBJywgJ27DscWIxYROw5HFh8WDJywgJ2/DssOz4buPw7Xhu43DtOG7k+G7keG7leG7l+G7mcah4buf4buh4bub4bud4bujw7bDuMWNT8OSw5Phu47DleG7jMOU4buS4buQ4buU4buW4buYxqDhu57hu6Dhu5rhu5zhu6LDlsOYxYwnLCAncsWZUsWYJywgJ3PFocWbyJnFn1PFoMWayJjFnicsICd0xaXIm8WjVMWkyJrFoicsICd1w7nDuuG7p8Wp4bulxrDhu6vhu6nhu63hu6/hu7HDu8O8xa/Fq1XDmcOa4bumxajhu6TGr+G7quG7qOG7rOG7ruG7sMObw5zFrsWqJywgJ3nDveG7s+G7t+G7ueG7tcO/WcOd4buy4bu24bu44bu0xbgnLCAnesW+xbzFulrFvcW7xbknXTtcbiAgICAgIHZhciBoYW5kbGVkID0gW107XG4gICAgICBzdHIuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgIGRjdC5ldmVyeShmdW5jdGlvbiAoZGN0KSB7XG4gICAgICAgICAgaWYgKGRjdC5pbmRleE9mKGNoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVkLmluZGV4T2YoZGN0KSA+IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoJ1snICsgZGN0ICsgJ10nLCAnZ20nICsgc2VucyksICdbJyArIGRjdCArICddJyk7XG4gICAgICAgICAgICBoYW5kbGVkLnB1c2goZGN0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZU1lcmdlZEJsYW5rc1JlZ0V4cCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZU1lcmdlZEJsYW5rc1JlZ0V4cChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcc10rL2dtaSwgJ1tcXFxcc10rJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlQWNjdXJhY3lSZWdFeHAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVBY2N1cmFjeVJlZ0V4cChzdHIpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBjaGFycyA9ICchXCIjJCUmXFwnKCkqKywtLi86Ozw9Pj9AW1xcXFxdXl9ge3x9fsKhwr8nO1xuICAgICAgdmFyIGFjYyA9IHRoaXMub3B0LmFjY3VyYWN5LFxuICAgICAgICAgIHZhbCA9IHR5cGVvZiBhY2MgPT09ICdzdHJpbmcnID8gYWNjIDogYWNjLnZhbHVlLFxuICAgICAgICAgIGxzID0gdHlwZW9mIGFjYyA9PT0gJ3N0cmluZycgPyBbXSA6IGFjYy5saW1pdGVycyxcbiAgICAgICAgICBsc0pvaW4gPSAnJztcbiAgICAgIGxzLmZvckVhY2goZnVuY3Rpb24gKGxpbWl0ZXIpIHtcbiAgICAgICAgbHNKb2luICs9ICd8JyArIF90aGlzLmVzY2FwZVN0cihsaW1pdGVyKTtcbiAgICAgIH0pO1xuICAgICAgc3dpdGNoICh2YWwpIHtcbiAgICAgICAgY2FzZSAncGFydGlhbGx5JzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJygpKCcgKyBzdHIgKyAnKSc7XG4gICAgICAgIGNhc2UgJ2NvbXBsZW1lbnRhcnknOlxuICAgICAgICAgIGxzSm9pbiA9ICdcXFxccycgKyAobHNKb2luID8gbHNKb2luIDogdGhpcy5lc2NhcGVTdHIoY2hhcnMpKTtcbiAgICAgICAgICByZXR1cm4gJygpKFteJyArIGxzSm9pbiArICddKicgKyBzdHIgKyAnW14nICsgbHNKb2luICsgJ10qKSc7XG4gICAgICAgIGNhc2UgJ2V4YWN0bHknOlxuICAgICAgICAgIHJldHVybiAnKF58XFxcXHMnICsgbHNKb2luICsgJykoJyArIHN0ciArICcpKD89JHxcXFxccycgKyBsc0pvaW4gKyAnKSc7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2VwYXJhdGVkS2V5d29yZHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTZXBhcmF0ZWRLZXl3b3Jkcyhzdikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBzdGFjayA9IFtdO1xuICAgICAgc3YuZm9yRWFjaChmdW5jdGlvbiAoa3cpIHtcbiAgICAgICAgaWYgKCFfdGhpczIub3B0LnNlcGFyYXRlV29yZFNlYXJjaCkge1xuICAgICAgICAgIGlmIChrdy50cmltKCkgJiYgc3RhY2suaW5kZXhPZihrdykgPT09IC0xKSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKGt3KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAga3cuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChrd1NwbGl0dGVkKSB7XG4gICAgICAgICAgICBpZiAoa3dTcGxpdHRlZC50cmltKCkgJiYgc3RhY2suaW5kZXhPZihrd1NwbGl0dGVkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgc3RhY2sucHVzaChrd1NwbGl0dGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAna2V5d29yZHMnOiBzdGFjay5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgICAgIH0pLFxuICAgICAgICAnbGVuZ3RoJzogc3RhY2subGVuZ3RoXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2lzTnVtZXJpYycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzTnVtZXJpYyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIE51bWJlcihwYXJzZUZsb2F0KHZhbHVlKSkgPT0gdmFsdWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2hlY2tSYW5nZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja1JhbmdlcyhhcnJheSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5WzBdKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgdGhpcy5sb2coJ21hcmtSYW5nZXMoKSB3aWxsIG9ubHkgYWNjZXB0IGFuIGFycmF5IG9mIG9iamVjdHMnKTtcbiAgICAgICAgdGhpcy5vcHQubm9NYXRjaChhcnJheSk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBzdGFjayA9IFtdO1xuICAgICAgdmFyIGxhc3QgPSAwO1xuICAgICAgYXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5zdGFydCAtIGIuc3RhcnQ7XG4gICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBfY2FsbE5vTWF0Y2hPbkludmFsaWQgPSBfdGhpczMuY2FsbE5vTWF0Y2hPbkludmFsaWRSYW5nZXMoaXRlbSwgbGFzdCksXG4gICAgICAgICAgICBzdGFydCA9IF9jYWxsTm9NYXRjaE9uSW52YWxpZC5zdGFydCxcbiAgICAgICAgICAgIGVuZCA9IF9jYWxsTm9NYXRjaE9uSW52YWxpZC5lbmQsXG4gICAgICAgICAgICB2YWxpZCA9IF9jYWxsTm9NYXRjaE9uSW52YWxpZC52YWxpZDtcblxuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICBpdGVtLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgICAgaXRlbS5sZW5ndGggPSBlbmQgLSBzdGFydDtcbiAgICAgICAgICBzdGFjay5wdXNoKGl0ZW0pO1xuICAgICAgICAgIGxhc3QgPSBlbmQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NhbGxOb01hdGNoT25JbnZhbGlkUmFuZ2VzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FsbE5vTWF0Y2hPbkludmFsaWRSYW5nZXMocmFuZ2UsIGxhc3QpIHtcbiAgICAgIHZhciBzdGFydCA9IHZvaWQgMCxcbiAgICAgICAgICBlbmQgPSB2b2lkIDAsXG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIGlmIChyYW5nZSAmJiB0eXBlb2YgcmFuZ2Uuc3RhcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHN0YXJ0ID0gcGFyc2VJbnQocmFuZ2Uuc3RhcnQsIDEwKTtcbiAgICAgICAgZW5kID0gc3RhcnQgKyBwYXJzZUludChyYW5nZS5sZW5ndGgsIDEwKTtcbiAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljKHJhbmdlLnN0YXJ0KSAmJiB0aGlzLmlzTnVtZXJpYyhyYW5nZS5sZW5ndGgpICYmIGVuZCAtIGxhc3QgPiAwICYmIGVuZCAtIHN0YXJ0ID4gMCkge1xuICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZygnSWdub3JpbmcgaW52YWxpZCBvciBvdmVybGFwcGluZyByYW5nZTogJyArICgnJyArIEpTT04uc3RyaW5naWZ5KHJhbmdlKSkpO1xuICAgICAgICAgIHRoaXMub3B0Lm5vTWF0Y2gocmFuZ2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZygnSWdub3JpbmcgaW52YWxpZCByYW5nZTogJyArIEpTT04uc3RyaW5naWZ5KHJhbmdlKSk7XG4gICAgICAgIHRoaXMub3B0Lm5vTWF0Y2gocmFuZ2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQ6IGVuZCxcbiAgICAgICAgdmFsaWQ6IHZhbGlkXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NoZWNrV2hpdGVzcGFjZVJhbmdlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrV2hpdGVzcGFjZVJhbmdlcyhyYW5nZSwgb3JpZ2luYWxMZW5ndGgsIHN0cmluZykge1xuICAgICAgdmFyIGVuZCA9IHZvaWQgMCxcbiAgICAgICAgICB2YWxpZCA9IHRydWUsXG4gICAgICAgICAgbWF4ID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICBvZmZzZXQgPSBvcmlnaW5hbExlbmd0aCAtIG1heCxcbiAgICAgICAgICBzdGFydCA9IHBhcnNlSW50KHJhbmdlLnN0YXJ0LCAxMCkgLSBvZmZzZXQ7XG4gICAgICBzdGFydCA9IHN0YXJ0ID4gbWF4ID8gbWF4IDogc3RhcnQ7XG4gICAgICBlbmQgPSBzdGFydCArIHBhcnNlSW50KHJhbmdlLmxlbmd0aCwgMTApO1xuICAgICAgaWYgKGVuZCA+IG1heCkge1xuICAgICAgICBlbmQgPSBtYXg7XG4gICAgICAgIHRoaXMubG9nKCdFbmQgcmFuZ2UgYXV0b21hdGljYWxseSBzZXQgdG8gdGhlIG1heCB2YWx1ZSBvZiAnICsgbWF4KTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydCA8IDAgfHwgZW5kIC0gc3RhcnQgPCAwIHx8IHN0YXJ0ID4gbWF4IHx8IGVuZCA+IG1heCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZygnSW52YWxpZCByYW5nZTogJyArIEpTT04uc3RyaW5naWZ5KHJhbmdlKSk7XG4gICAgICAgIHRoaXMub3B0Lm5vTWF0Y2gocmFuZ2UpO1xuICAgICAgfSBlbHNlIGlmIChzdHJpbmcuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpLnJlcGxhY2UoL1xccysvZywgJycpID09PSAnJykge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZygnU2tpcHBpbmcgd2hpdGVzcGFjZSBvbmx5IHJhbmdlOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2UpKTtcbiAgICAgICAgdGhpcy5vcHQubm9NYXRjaChyYW5nZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZDogZW5kLFxuICAgICAgICB2YWxpZDogdmFsaWRcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0VGV4dE5vZGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VGV4dE5vZGVzKGNiKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIHZhbCA9ICcnLFxuICAgICAgICAgIG5vZGVzID0gW107XG4gICAgICB0aGlzLml0ZXJhdG9yLmZvckVhY2hOb2RlKE5vZGVGaWx0ZXIuU0hPV19URVhULCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICBzdGFydDogdmFsLmxlbmd0aCxcbiAgICAgICAgICBlbmQ6ICh2YWwgKz0gbm9kZS50ZXh0Q29udGVudCkubGVuZ3RoLFxuICAgICAgICAgIG5vZGU6IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9LCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoX3RoaXM0Lm1hdGNoZXNFeGNsdWRlKG5vZGUucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQ7XG4gICAgICAgIH1cbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Ioe1xuICAgICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgICAgbm9kZXM6IG5vZGVzXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWF0Y2hlc0V4Y2x1ZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRjaGVzRXhjbHVkZShlbCkge1xuICAgICAgcmV0dXJuIERPTUl0ZXJhdG9yLm1hdGNoZXMoZWwsIHRoaXMub3B0LmV4Y2x1ZGUuY29uY2F0KFsnc2NyaXB0JywgJ3N0eWxlJywgJ3RpdGxlJywgJ2hlYWQnLCAnaHRtbCddKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnd3JhcFJhbmdlSW5UZXh0Tm9kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdyYXBSYW5nZUluVGV4dE5vZGUobm9kZSwgc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIGhFbCA9ICF0aGlzLm9wdC5lbGVtZW50ID8gJ21hcmsnIDogdGhpcy5vcHQuZWxlbWVudCxcbiAgICAgICAgICBzdGFydE5vZGUgPSBub2RlLnNwbGl0VGV4dChzdGFydCksXG4gICAgICAgICAgcmV0ID0gc3RhcnROb2RlLnNwbGl0VGV4dChlbmQgLSBzdGFydCk7XG4gICAgICB2YXIgcmVwbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaEVsKTtcbiAgICAgIHJlcGwuc2V0QXR0cmlidXRlKCdkYXRhLW1hcmtqcycsICd0cnVlJyk7XG4gICAgICBpZiAodGhpcy5vcHQuY2xhc3NOYW1lKSB7XG4gICAgICAgIHJlcGwuc2V0QXR0cmlidXRlKCdjbGFzcycsIHRoaXMub3B0LmNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgICByZXBsLnRleHRDb250ZW50ID0gc3RhcnROb2RlLnRleHRDb250ZW50O1xuICAgICAgc3RhcnROb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHJlcGwsIHN0YXJ0Tm9kZSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3dyYXBSYW5nZUluTWFwcGVkVGV4dE5vZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3cmFwUmFuZ2VJbk1hcHBlZFRleHROb2RlKGRpY3QsIHN0YXJ0LCBlbmQsIGZpbHRlckNiLCBlYWNoQ2IpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICBkaWN0Lm5vZGVzLmV2ZXJ5KGZ1bmN0aW9uIChuLCBpKSB7XG4gICAgICAgIHZhciBzaWJsID0gZGljdC5ub2Rlc1tpICsgMV07XG4gICAgICAgIGlmICh0eXBlb2Ygc2libCA9PT0gJ3VuZGVmaW5lZCcgfHwgc2libC5zdGFydCA+IHN0YXJ0KSB7XG4gICAgICAgICAgaWYgKCFmaWx0ZXJDYihuLm5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzID0gc3RhcnQgLSBuLnN0YXJ0LFxuICAgICAgICAgICAgICBlID0gKGVuZCA+IG4uZW5kID8gbi5lbmQgOiBlbmQpIC0gbi5zdGFydCxcbiAgICAgICAgICAgICAgc3RhcnRTdHIgPSBkaWN0LnZhbHVlLnN1YnN0cigwLCBuLnN0YXJ0KSxcbiAgICAgICAgICAgICAgZW5kU3RyID0gZGljdC52YWx1ZS5zdWJzdHIoZSArIG4uc3RhcnQpO1xuICAgICAgICAgIG4ubm9kZSA9IF90aGlzNS53cmFwUmFuZ2VJblRleHROb2RlKG4ubm9kZSwgcywgZSk7XG4gICAgICAgICAgZGljdC52YWx1ZSA9IHN0YXJ0U3RyICsgZW5kU3RyO1xuICAgICAgICAgIGRpY3Qubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoaywgaikge1xuICAgICAgICAgICAgaWYgKGogPj0gaSkge1xuICAgICAgICAgICAgICBpZiAoZGljdC5ub2Rlc1tqXS5zdGFydCA+IDAgJiYgaiAhPT0gaSkge1xuICAgICAgICAgICAgICAgIGRpY3Qubm9kZXNbal0uc3RhcnQgLT0gZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaWN0Lm5vZGVzW2pdLmVuZCAtPSBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVuZCAtPSBlO1xuICAgICAgICAgIGVhY2hDYihuLm5vZGUucHJldmlvdXNTaWJsaW5nLCBuLnN0YXJ0KTtcbiAgICAgICAgICBpZiAoZW5kID4gbi5lbmQpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gbi5lbmQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd3cmFwTWF0Y2hlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdyYXBNYXRjaGVzKHJlZ2V4LCBpZ25vcmVHcm91cHMsIGZpbHRlckNiLCBlYWNoQ2IsIGVuZENiKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgdmFyIG1hdGNoSWR4ID0gaWdub3JlR3JvdXBzID09PSAwID8gMCA6IGlnbm9yZUdyb3VwcyArIDE7XG4gICAgICB0aGlzLmdldFRleHROb2RlcyhmdW5jdGlvbiAoZGljdCkge1xuICAgICAgICBkaWN0Lm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5ub2RlO1xuICAgICAgICAgIHZhciBtYXRjaCA9IHZvaWQgMDtcbiAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXguZXhlYyhub2RlLnRleHRDb250ZW50KSkgIT09IG51bGwgJiYgbWF0Y2hbbWF0Y2hJZHhdICE9PSAnJykge1xuICAgICAgICAgICAgaWYgKCFmaWx0ZXJDYihtYXRjaFttYXRjaElkeF0sIG5vZGUpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBvcyA9IG1hdGNoLmluZGV4O1xuICAgICAgICAgICAgaWYgKG1hdGNoSWR4ICE9PSAwKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbWF0Y2hJZHg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBvcyArPSBtYXRjaFtpXS5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUgPSBfdGhpczYud3JhcFJhbmdlSW5UZXh0Tm9kZShub2RlLCBwb3MsIHBvcyArIG1hdGNoW21hdGNoSWR4XS5sZW5ndGgpO1xuICAgICAgICAgICAgZWFjaENiKG5vZGUucHJldmlvdXNTaWJsaW5nKTtcbiAgICAgICAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZW5kQ2IoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3dyYXBNYXRjaGVzQWNyb3NzRWxlbWVudHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3cmFwTWF0Y2hlc0Fjcm9zc0VsZW1lbnRzKHJlZ2V4LCBpZ25vcmVHcm91cHMsIGZpbHRlckNiLCBlYWNoQ2IsIGVuZENiKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgdmFyIG1hdGNoSWR4ID0gaWdub3JlR3JvdXBzID09PSAwID8gMCA6IGlnbm9yZUdyb3VwcyArIDE7XG4gICAgICB0aGlzLmdldFRleHROb2RlcyhmdW5jdGlvbiAoZGljdCkge1xuICAgICAgICB2YXIgbWF0Y2ggPSB2b2lkIDA7XG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKGRpY3QudmFsdWUpKSAhPT0gbnVsbCAmJiBtYXRjaFttYXRjaElkeF0gIT09ICcnKSB7XG4gICAgICAgICAgdmFyIHN0YXJ0ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgICAgaWYgKG1hdGNoSWR4ICE9PSAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG1hdGNoSWR4OyBpKyspIHtcbiAgICAgICAgICAgICAgc3RhcnQgKz0gbWF0Y2hbaV0ubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBtYXRjaFttYXRjaElkeF0ubGVuZ3RoO1xuICAgICAgICAgIF90aGlzNy53cmFwUmFuZ2VJbk1hcHBlZFRleHROb2RlKGRpY3QsIHN0YXJ0LCBlbmQsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2IobWF0Y2hbbWF0Y2hJZHhdLCBub2RlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAobm9kZSwgbGFzdEluZGV4KSB7XG4gICAgICAgICAgICByZWdleC5sYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgICBlYWNoQ2Iobm9kZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZW5kQ2IoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3dyYXBSYW5nZUZyb21JbmRleCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdyYXBSYW5nZUZyb21JbmRleChyYW5nZXMsIGZpbHRlckNiLCBlYWNoQ2IsIGVuZENiKSB7XG4gICAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgICAgdGhpcy5nZXRUZXh0Tm9kZXMoZnVuY3Rpb24gKGRpY3QpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsTGVuZ3RoID0gZGljdC52YWx1ZS5sZW5ndGg7XG4gICAgICAgIHJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChyYW5nZSwgY291bnRlcikge1xuICAgICAgICAgIHZhciBfY2hlY2tXaGl0ZXNwYWNlUmFuZ2UgPSBfdGhpczguY2hlY2tXaGl0ZXNwYWNlUmFuZ2VzKHJhbmdlLCBvcmlnaW5hbExlbmd0aCwgZGljdC52YWx1ZSksXG4gICAgICAgICAgICAgIHN0YXJ0ID0gX2NoZWNrV2hpdGVzcGFjZVJhbmdlLnN0YXJ0LFxuICAgICAgICAgICAgICBlbmQgPSBfY2hlY2tXaGl0ZXNwYWNlUmFuZ2UuZW5kLFxuICAgICAgICAgICAgICB2YWxpZCA9IF9jaGVja1doaXRlc3BhY2VSYW5nZS52YWxpZDtcblxuICAgICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgICAgX3RoaXM4LndyYXBSYW5nZUluTWFwcGVkVGV4dE5vZGUoZGljdCwgc3RhcnQsIGVuZCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlckNiKG5vZGUsIHJhbmdlLCBkaWN0LnZhbHVlLnN1YnN0cmluZyhzdGFydCwgZW5kKSwgY291bnRlcik7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICBlYWNoQ2Iobm9kZSwgcmFuZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZW5kQ2IoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Vud3JhcE1hdGNoZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bndyYXBNYXRjaGVzKG5vZGUpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICB2YXIgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCkpO1xuICAgICAgfVxuICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChkb2NGcmFnLCBub2RlKTtcbiAgICAgIGlmICghdGhpcy5pZSkge1xuICAgICAgICBwYXJlbnQubm9ybWFsaXplKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZVRleHROb2RlKHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbm9ybWFsaXplVGV4dE5vZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBub3JtYWxpemVUZXh0Tm9kZShub2RlKSB7XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgd2hpbGUgKG5vZGUubmV4dFNpYmxpbmcgJiYgbm9kZS5uZXh0U2libGluZy5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgIG5vZGUubm9kZVZhbHVlICs9IG5vZGUubmV4dFNpYmxpbmcubm9kZVZhbHVlO1xuICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlLm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub3JtYWxpemVUZXh0Tm9kZShub2RlLmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgdGhpcy5ub3JtYWxpemVUZXh0Tm9kZShub2RlLm5leHRTaWJsaW5nKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdtYXJrUmVnRXhwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWFya1JlZ0V4cChyZWdleHAsIG9wdCkge1xuICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgIHRoaXMub3B0ID0gb3B0O1xuICAgICAgdGhpcy5sb2coJ1NlYXJjaGluZyB3aXRoIGV4cHJlc3Npb24gXCInICsgcmVnZXhwICsgJ1wiJyk7XG4gICAgICB2YXIgdG90YWxNYXRjaGVzID0gMCxcbiAgICAgICAgICBmbiA9ICd3cmFwTWF0Y2hlcyc7XG4gICAgICB2YXIgZWFjaENiID0gZnVuY3Rpb24gZWFjaENiKGVsZW1lbnQpIHtcbiAgICAgICAgdG90YWxNYXRjaGVzKys7XG4gICAgICAgIF90aGlzOS5vcHQuZWFjaChlbGVtZW50KTtcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5vcHQuYWNyb3NzRWxlbWVudHMpIHtcbiAgICAgICAgZm4gPSAnd3JhcE1hdGNoZXNBY3Jvc3NFbGVtZW50cyc7XG4gICAgICB9XG4gICAgICB0aGlzW2ZuXShyZWdleHAsIHRoaXMub3B0Lmlnbm9yZUdyb3VwcywgZnVuY3Rpb24gKG1hdGNoLCBub2RlKSB7XG4gICAgICAgIHJldHVybiBfdGhpczkub3B0LmZpbHRlcihub2RlLCBtYXRjaCwgdG90YWxNYXRjaGVzKTtcbiAgICAgIH0sIGVhY2hDYiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodG90YWxNYXRjaGVzID09PSAwKSB7XG4gICAgICAgICAgX3RoaXM5Lm9wdC5ub01hdGNoKHJlZ2V4cCk7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXM5Lm9wdC5kb25lKHRvdGFsTWF0Y2hlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdtYXJrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWFyayhzdiwgb3B0KSB7XG4gICAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICAgIHRoaXMub3B0ID0gb3B0O1xuICAgICAgdmFyIHRvdGFsTWF0Y2hlcyA9IDAsXG4gICAgICAgICAgZm4gPSAnd3JhcE1hdGNoZXMnO1xuXG4gICAgICB2YXIgX2dldFNlcGFyYXRlZEtleXdvcmRzID0gdGhpcy5nZXRTZXBhcmF0ZWRLZXl3b3Jkcyh0eXBlb2Ygc3YgPT09ICdzdHJpbmcnID8gW3N2XSA6IHN2KSxcbiAgICAgICAgICBrd0FyciA9IF9nZXRTZXBhcmF0ZWRLZXl3b3Jkcy5rZXl3b3JkcyxcbiAgICAgICAgICBrd0FyckxlbiA9IF9nZXRTZXBhcmF0ZWRLZXl3b3Jkcy5sZW5ndGgsXG4gICAgICAgICAgc2VucyA9IHRoaXMub3B0LmNhc2VTZW5zaXRpdmUgPyAnJyA6ICdpJyxcbiAgICAgICAgICBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcihrdykge1xuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKF90aGlzMTAuY3JlYXRlUmVnRXhwKGt3KSwgJ2dtJyArIHNlbnMpLFxuICAgICAgICAgICAgbWF0Y2hlcyA9IDA7XG4gICAgICAgIF90aGlzMTAubG9nKCdTZWFyY2hpbmcgd2l0aCBleHByZXNzaW9uIFwiJyArIHJlZ2V4ICsgJ1wiJyk7XG4gICAgICAgIF90aGlzMTBbZm5dKHJlZ2V4LCAxLCBmdW5jdGlvbiAodGVybSwgbm9kZSkge1xuICAgICAgICAgIHJldHVybiBfdGhpczEwLm9wdC5maWx0ZXIobm9kZSwga3csIHRvdGFsTWF0Y2hlcywgbWF0Y2hlcyk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgbWF0Y2hlcysrO1xuICAgICAgICAgIHRvdGFsTWF0Y2hlcysrO1xuICAgICAgICAgIF90aGlzMTAub3B0LmVhY2goZWxlbWVudCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobWF0Y2hlcyA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMxMC5vcHQubm9NYXRjaChrdyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChrd0Fycltrd0FyckxlbiAtIDFdID09PSBrdykge1xuICAgICAgICAgICAgX3RoaXMxMC5vcHQuZG9uZSh0b3RhbE1hdGNoZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVyKGt3QXJyW2t3QXJyLmluZGV4T2Yoa3cpICsgMV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5vcHQuYWNyb3NzRWxlbWVudHMpIHtcbiAgICAgICAgZm4gPSAnd3JhcE1hdGNoZXNBY3Jvc3NFbGVtZW50cyc7XG4gICAgICB9XG4gICAgICBpZiAoa3dBcnJMZW4gPT09IDApIHtcbiAgICAgICAgdGhpcy5vcHQuZG9uZSh0b3RhbE1hdGNoZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlcihrd0FyclswXSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWFya1JhbmdlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hcmtSYW5nZXMocmF3UmFuZ2VzLCBvcHQpIHtcbiAgICAgIHZhciBfdGhpczExID0gdGhpcztcblxuICAgICAgdGhpcy5vcHQgPSBvcHQ7XG4gICAgICB2YXIgdG90YWxNYXRjaGVzID0gMCxcbiAgICAgICAgICByYW5nZXMgPSB0aGlzLmNoZWNrUmFuZ2VzKHJhd1Jhbmdlcyk7XG4gICAgICBpZiAocmFuZ2VzICYmIHJhbmdlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5sb2coJ1N0YXJ0aW5nIHRvIG1hcmsgd2l0aCB0aGUgZm9sbG93aW5nIHJhbmdlczogJyArIEpTT04uc3RyaW5naWZ5KHJhbmdlcykpO1xuICAgICAgICB0aGlzLndyYXBSYW5nZUZyb21JbmRleChyYW5nZXMsIGZ1bmN0aW9uIChub2RlLCByYW5nZSwgbWF0Y2gsIGNvdW50ZXIpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMxMS5vcHQuZmlsdGVyKG5vZGUsIHJhbmdlLCBtYXRjaCwgY291bnRlcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlbGVtZW50LCByYW5nZSkge1xuICAgICAgICAgIHRvdGFsTWF0Y2hlcysrO1xuICAgICAgICAgIF90aGlzMTEub3B0LmVhY2goZWxlbWVudCwgcmFuZ2UpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMxMS5vcHQuZG9uZSh0b3RhbE1hdGNoZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0LmRvbmUodG90YWxNYXRjaGVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bm1hcmsnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bm1hcmsob3B0KSB7XG4gICAgICB2YXIgX3RoaXMxMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMub3B0ID0gb3B0O1xuICAgICAgdmFyIHNlbCA9IHRoaXMub3B0LmVsZW1lbnQgPyB0aGlzLm9wdC5lbGVtZW50IDogJyonO1xuICAgICAgc2VsICs9ICdbZGF0YS1tYXJranNdJztcbiAgICAgIGlmICh0aGlzLm9wdC5jbGFzc05hbWUpIHtcbiAgICAgICAgc2VsICs9ICcuJyArIHRoaXMub3B0LmNsYXNzTmFtZTtcbiAgICAgIH1cbiAgICAgIHRoaXMubG9nKCdSZW1vdmFsIHNlbGVjdG9yIFwiJyArIHNlbCArICdcIicpO1xuICAgICAgdGhpcy5pdGVyYXRvci5mb3JFYWNoTm9kZShOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgX3RoaXMxMi51bndyYXBNYXRjaGVzKG5vZGUpO1xuICAgICAgfSwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIG1hdGNoZXNTZWwgPSBET01JdGVyYXRvci5tYXRjaGVzKG5vZGUsIHNlbCksXG4gICAgICAgICAgICBtYXRjaGVzRXhjbHVkZSA9IF90aGlzMTIubWF0Y2hlc0V4Y2x1ZGUobm9kZSk7XG4gICAgICAgIGlmICghbWF0Y2hlc1NlbCB8fCBtYXRjaGVzRXhjbHVkZSkge1xuICAgICAgICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5vcHQuZG9uZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb3B0JyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2YWwpIHtcbiAgICAgIHRoaXMuX29wdCA9IF9leHRlbmRzKHt9LCB7XG4gICAgICAgICdlbGVtZW50JzogJycsXG4gICAgICAgICdjbGFzc05hbWUnOiAnJyxcbiAgICAgICAgJ2V4Y2x1ZGUnOiBbXSxcbiAgICAgICAgJ2lmcmFtZXMnOiBmYWxzZSxcbiAgICAgICAgJ2lmcmFtZXNUaW1lb3V0JzogNTAwMCxcbiAgICAgICAgJ3NlcGFyYXRlV29yZFNlYXJjaCc6IHRydWUsXG4gICAgICAgICdkaWFjcml0aWNzJzogdHJ1ZSxcbiAgICAgICAgJ3N5bm9ueW1zJzoge30sXG4gICAgICAgICdhY2N1cmFjeSc6ICdwYXJ0aWFsbHknLFxuICAgICAgICAnYWNyb3NzRWxlbWVudHMnOiBmYWxzZSxcbiAgICAgICAgJ2Nhc2VTZW5zaXRpdmUnOiBmYWxzZSxcbiAgICAgICAgJ2lnbm9yZUpvaW5lcnMnOiBmYWxzZSxcbiAgICAgICAgJ2lnbm9yZUdyb3Vwcyc6IDAsXG4gICAgICAgICdpZ25vcmVQdW5jdHVhdGlvbic6IFtdLFxuICAgICAgICAnd2lsZGNhcmRzJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ2VhY2gnOiBmdW5jdGlvbiBlYWNoKCkge30sXG4gICAgICAgICdub01hdGNoJzogZnVuY3Rpb24gbm9NYXRjaCgpIHt9LFxuICAgICAgICAnZmlsdGVyJzogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICAnZG9uZSc6IGZ1bmN0aW9uIGRvbmUoKSB7fSxcbiAgICAgICAgJ2RlYnVnJzogZmFsc2UsXG4gICAgICAgICdsb2cnOiB3aW5kb3cuY29uc29sZVxuICAgICAgfSwgdmFsKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX29wdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpdGVyYXRvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICByZXR1cm4gbmV3IERPTUl0ZXJhdG9yKHRoaXMuY3R4LCB0aGlzLm9wdC5pZnJhbWVzLCB0aGlzLm9wdC5leGNsdWRlLCB0aGlzLm9wdC5pZnJhbWVzVGltZW91dCk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNYXJrO1xufSgpO1xuXG5mdW5jdGlvbiBNYXJrKGN0eCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciBpbnN0YW5jZSA9IG5ldyBNYXJrJDEoY3R4KTtcbiAgdGhpcy5tYXJrID0gZnVuY3Rpb24gKHN2LCBvcHQpIHtcbiAgICBpbnN0YW5jZS5tYXJrKHN2LCBvcHQpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfTtcbiAgdGhpcy5tYXJrUmVnRXhwID0gZnVuY3Rpb24gKHN2LCBvcHQpIHtcbiAgICBpbnN0YW5jZS5tYXJrUmVnRXhwKHN2LCBvcHQpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfTtcbiAgdGhpcy5tYXJrUmFuZ2VzID0gZnVuY3Rpb24gKHN2LCBvcHQpIHtcbiAgICBpbnN0YW5jZS5tYXJrUmFuZ2VzKHN2LCBvcHQpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfTtcbiAgdGhpcy51bm1hcmsgPSBmdW5jdGlvbiAob3B0KSB7XG4gICAgaW5zdGFuY2UudW5tYXJrKG9wdCk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9O1xuICByZXR1cm4gdGhpcztcbn1cblxucmV0dXJuIE1hcms7XG5cbn0pKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNoaW55OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ3NoaW55JztcbmltcG9ydCBNYXJrIGZyb20gJ21hcmsuanMnO1xuXG5sZXQgbWFya2VycyA9IFtdO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignbWFya2VyLWluaXQnLCBmdW5jdGlvbihvcHRzKSB7XG5cdGxldCBpbnN0YW5jZSA9IG5ldyBNYXJrKG9wdHMuc2VsZWN0b3IpO1xuXHRtYXJrZXJzW29wdHMubmFtZV0gPSBpbnN0YW5jZTtcbn0pO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignbWFya2VyLW1hcmsnLCBmdW5jdGlvbihvcHRzKSB7XG4gIGxldCBkb25lID0gZnVuY3Rpb24oY291bnRlcil7XG4gICAgU2hpbnkuc2V0SW5wdXRWYWx1ZShvcHRzLm5hbWUgKyAnX21hcmtlZCcgKyBcIjptYXJrZXJQYXJzZVwiLCBjb3VudGVyKTtcbiAgfTtcblxuICBpZihvcHRzLm1hcmtlZClcbiAgICBvcHRzLm9wdGlvbnMuZG9uZSA9IGRvbmU7XG4gIFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgbWFya2Vyc1tvcHRzLm5hbWVdLm1hcmsob3B0cy5rZXl3b3Jkcywgb3B0cy5vcHRpb25zKVxuICB9LCBvcHRzLmRlbGF5KTtcbn0pO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignbWFya2VyLXVubWFyaycsIGZ1bmN0aW9uKG9wdHMpIHtcbiAgbWFya2Vyc1tvcHRzLm5hbWVdLnVubWFyayhvcHRzLm9wdGlvbnMpXG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ21hcmtlci1tYXJrLXJlZ2V4JywgZnVuY3Rpb24ob3B0cykge1xuICBsZXQgZG9uZSA9IGZ1bmN0aW9uKGNvdW50ZXIpe1xuICAgIFNoaW55LnNldElucHV0VmFsdWUob3B0cy5uYW1lICsgJ19tYXJrZWQnICsgXCI6bWFya2VyUGFyc2VcIiwgY291bnRlcik7XG4gIH07XG5cbiAgaWYob3B0cy5tYXJrZWQpXG4gICAgb3B0cy5vcHRpb25zLmRvbmUgPSBkb25lO1xuICBcbiAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChvcHRzLnJlZ2V4KTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIG1hcmtlcnNbb3B0cy5uYW1lXS5tYXJrUmVnRXhwKHJlZ2V4LCBvcHRzLm9wdGlvbnMpO1xuICB9LCBvcHRzLmRlbGF5KTtcbn0pO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignbWFya2VyLW1hcmstcmFuZ2VzJywgZnVuY3Rpb24ob3B0cykge1xuICBsZXQgZG9uZSA9IGZ1bmN0aW9uKGNvdW50ZXIpe1xuICAgIFNoaW55LnNldElucHV0VmFsdWUob3B0cy5uYW1lICsgJ19tYXJrZWQnICsgXCI6bWFya2VyUGFyc2VcIiwgY291bnRlcik7XG4gIH07XG5cbiAgaWYob3B0cy5tYXJrZWQpXG4gICAgb3B0cy5vcHRpb25zLmRvbmUgPSBkb25lO1xuICBcbiAgbWFya2Vyc1tvcHRzLm5hbWVdLm1hcmtSYW5nZXMob3B0cy5yYW5nZXMsIG9wdHMub3B0aW9ucylcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=