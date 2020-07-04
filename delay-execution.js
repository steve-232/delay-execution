"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var DelayExecution = function() {
    function DelayExecution(_ref) {
        var _ref$elem = _ref.elem, elem = _ref$elem === void 0 ? null : _ref$elem, _ref$func = _ref.func, func = _ref$func === void 0 ? null : _ref$func, _ref$direction = _ref.direction, direction = _ref$direction === void 0 ? "v" : _ref$direction, _ref$parent = _ref.parent, parent = _ref$parent === void 0 ? window : _ref$parent, _ref$pixelDelay = _ref.pixelDelay, pixelDelay = _ref$pixelDelay === void 0 ? 0 : _ref$pixelDelay, _ref$timeDelay = _ref.timeDelay, timeDelay = _ref$timeDelay === void 0 ? 0 : _ref$timeDelay, _ref$includeElemHeigh = _ref.includeElemHeight, includeElemHeight = _ref$includeElemHeigh === void 0 ? true : _ref$includeElemHeigh, _ref$debounce = _ref.debounce, debounce = _ref$debounce === void 0 ? 500 : _ref$debounce;
        _classCallCheck(this, DelayExecution);
        if (!(elem instanceof HTMLElement)) throw new TypeError('"elem" is not HTMLElement');
        if (!(func instanceof Function)) throw new TypeError('"func" is not Function');
        this.elem = elem;
        this.func = func;
        this.direction = direction;
        this.parent = parent;
        this.pixelDelay = pixelDelay;
        this.timeDelay = timeDelay;
        this.includeElemHeight = includeElemHeight;
        this.debounce = debounce;
        if (parent.constructor.name !== "Window" && getComputedStyle(parent).getPropertyValue("position") === "static") parent.style.position = "relative";
        parent.addEventListener("scroll", this.checkPosition.bind(this));
        this.getElemPosition();
        this.checkPosition();
        parent.addEventListener("resize", this.followWindowResizing.bind(this));
    }
    _createClass(DelayExecution, [ {
        key: "getElemPosition",
        value: function getElemPosition() {
            this.elemPosition = (this.direction === "v" ? this.elem.offsetTop : this.elem.offsetLeft) + this.pixelDelay;
            if (this.includeElemHeight) this.elemPosition += this.elem.offsetHeight;
        }
    }, {
        key: "getParentPosition",
        value: function getParentPosition() {
            if (this.direction !== "v") return this.parent.constructor.name === "Window" ? window.innerWidth + window.scrollX : this.parent.clientWidth + this.parent.scrollLeft;
            return this.parent.constructor.name === "Window" ? window.innerHeight + window.scrollY : this.parent.clientHeight + this.parent.scrollTop;
        }
    }, {
        key: "checkPosition",
        value: function checkPosition() {
            if (this.getParentPosition() >= this.elemPosition) {
                this.parent.removeEventListener("scroll", this.checkPosition.bind(this));
                this.parent.removeEventListener("resize", this.followWindowResizing.bind(this));
                setTimeout(this.func, this.timeDelay);
            }
        }
    }, {
        key: "followWindowResizing",
        value: function followWindowResizing() {
            clearTimeout(this.followWindowResizingTimeout);
            this.followWindowResizingTimeout = setTimeout(this.getElemPosition, this.debounce);
        }
    } ]);
    return DelayExecution;
}();