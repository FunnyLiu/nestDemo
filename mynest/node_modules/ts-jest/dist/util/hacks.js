"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var semver_1 = __importDefault(require("semver"));
var logger_1 = require("./logger");
var messages_1 = require("./messages");
var logger = logger_1.rootLogger.child({ namespace: 'hacks' });
exports.patchBabelCore_githubIssue6577 = function (babel) {
    if (typeof babel.version !== 'string')
        return babel;
    var version = semver_1.default.coerce(babel.version);
    if (version && version.major === 6) {
        var flag = Symbol.for('ts-jest:patchBabelCore_githubIssue6577');
        try {
            var File = require('babel-core/lib/transformation/file').File;
            if (File.prototype.initOptions[flag])
                return babel;
            File.prototype.initOptions = (function (original) {
                return function initOptions(opt) {
                    var before = opt.sourceMaps;
                    var result = original.apply(this, arguments);
                    if (before && before !== result.sourceMaps) {
                        result.sourceMaps = before;
                    }
                    return result;
                };
            })(File.prototype.initOptions);
            Object.defineProperty(File.prototype.initOptions, flag, { value: true });
            logger.info('patched babel-core/lib/transformation/file');
        }
        catch (error) {
            logger.warn({ error: error }, messages_1.interpolate(messages_1.Errors.CannotPatchBabelCore6, { error: error.message }));
        }
    }
    return babel;
};
