"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const constants_1 = require("./../../constants");
/**
 * Defines the injectable class. This class can inject dependencies through constructor.
 * Those dependencies have to belong to the same module.
 */
function Injectable(options) {
    return (target) => {
        Reflect.defineMetadata(constants_1.SCOPE_OPTIONS_METADATA, options, target);
    };
}
exports.Injectable = Injectable;
function mixin(mixinClass) {
    Object.defineProperty(mixinClass, 'name', {
        value: uuid(),
    });
    Injectable()(mixinClass);
    return mixinClass;
}
exports.mixin = mixin;
