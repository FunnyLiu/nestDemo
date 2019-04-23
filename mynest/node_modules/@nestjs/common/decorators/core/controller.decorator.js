"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const shared_utils_1 = require("../../utils/shared.utils");
function Controller(prefixOrOptions) {
    const defaultPath = '/';
    const [path, scopeOptions] = shared_utils_1.isUndefined(prefixOrOptions)
        ? [defaultPath, undefined]
        : shared_utils_1.isString(prefixOrOptions)
            ? [prefixOrOptions, undefined]
            : [prefixOrOptions.path || defaultPath, { scope: prefixOrOptions.scope }];
    return (target) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, target);
        Reflect.defineMetadata(constants_1.SCOPE_OPTIONS_METADATA, scopeOptions, target);
    };
}
exports.Controller = Controller;
