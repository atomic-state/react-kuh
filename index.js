"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserOnly = exports.useSecondRender = exports.useObject = exports.useBoolean = exports.useWindowSize = void 0;
var react_1 = require("react");
function useWindowSize() {
    var _a = (0, react_1.useState)({
        width: 0,
        height: 0,
    }), size = _a[0], setSize = _a[1];
    (0, react_1.useEffect)(function () {
        if (typeof window !== "undefined") {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
    }, []);
    (0, react_1.useEffect)(function () {
        function resizeListener() {
            if (typeof window !== "undefined") {
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        }
        function addResizeListener() {
            if (typeof window !== "undefined") {
                window.addEventListener("resize", resizeListener);
            }
        }
        addResizeListener();
        return function () {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", resizeListener);
            }
        };
    }, []);
    return size;
}
exports.useWindowSize = useWindowSize;
function useBoolean(initialValue) {
    if (initialValue === void 0) { initialValue = null; }
    var _a = (0, react_1.useState)(initialValue), state = _a[0], setState = _a[1];
    var actions = {
        toggle: function () {
            setState(function (s) { return !s; });
        },
        off: function () {
            setState(false);
        },
        on: function () {
            setState(true);
        },
        set: function (v) {
            setState(v);
        },
        reset: function () {
            setState(initialValue);
        },
    };
    var end = [state, actions];
    return end;
}
exports.useBoolean = useBoolean;
function useObject(initialValue) {
    var _a = (0, react_1.useState)(initialValue), state = _a[0], setState = _a[1];
    var actions = {
        write: function (f) {
            var n = (typeof f === "function" ? f(state) : __assign(__assign({}, state), f));
            setState(function (s) { return (__assign(__assign({}, s), n)); });
        },
        replace: function (f) {
            var n = typeof f === "function" ? f(state) : f;
            setState(n);
        },
        reset: function () {
            setState(initialValue);
        },
    };
    var end = [state, actions];
    return end;
}
exports.useObject = useObject;
/**
 * Returns `true` after the component mounts/hydrates (after the first render)
 */
function useSecondRender() {
    var _a = (0, react_1.useState)(false), firstRender = _a[0], setFirstRender = _a[1];
    (0, react_1.useEffect)(function () {
        setFirstRender(true);
    }, []);
    return firstRender;
}
exports.useSecondRender = useSecondRender;
var isServer;
function BrowserOnly(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(typeof isServer !== "undefined" ? isServer : true), ssr = _b[0], setSSR = _b[1];
    (0, react_1.useEffect)(function () {
        if (typeof isServer === "undefined") {
            setSSR(false);
            isServer = false;
        }
    }, []);
    // This will render the fallback in the server
    return (ssr ? null : children);
}
exports.BrowserOnly = BrowserOnly;
