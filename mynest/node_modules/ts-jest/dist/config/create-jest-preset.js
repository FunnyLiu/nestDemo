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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../util/logger");
var jest_config_resolver_1 = require("./jest-config-resolver");
var logger = logger_1.rootLogger.child({ namespace: 'jest-preset' });
var jestConfigPkg = jest_config_resolver_1.getJestConfigPkg(logger);
var defaults = jestConfigPkg.defaults || {
    transform: null,
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
};
function createJestPreset(_a, from) {
    var _b = (_a === void 0 ? {} : _a).allowJs, allowJs = _b === void 0 ? false : _b;
    var _c;
    logger.debug({ allowJs: allowJs }, 'creating jest presets', allowJs ? 'handling' : 'not handling', 'JavaScript files');
    from = __assign({}, defaults, from);
    return {
        transform: __assign({}, from.transform, (_c = {}, _c[allowJs ? '^.+\\.[tj]sx?$' : '^.+\\.tsx?$'] = 'ts-jest', _c)),
        testMatch: dedup(__spread((from.testMatch || []), ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'])),
        moduleFileExtensions: dedup(__spread((from.moduleFileExtensions || []), ['ts', 'tsx'])),
    };
}
exports.createJestPreset = createJestPreset;
function dedup(array) {
    return array.filter(function (e, i, a) { return a.indexOf(e) === i; });
}
