"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const shared_utils_1 = require("../../utils/shared.utils");
/**
 * Injects provider which has to be available in the current injector (module) scope.
 * Providers are recognized by either types or tokens.
 */
function Inject(token) {
    return (target, key, index) => {
        token = token || Reflect.getMetadata('design:type', target, key);
        const type = token && shared_utils_1.isFunction(token) ? token.name : token;
        if (!shared_utils_1.isUndefined(index)) {
            let dependencies = Reflect.getMetadata(constants_1.SELF_DECLARED_DEPS_METADATA, target) || [];
            dependencies = [...dependencies, { index, param: type }];
            Reflect.defineMetadata(constants_1.SELF_DECLARED_DEPS_METADATA, dependencies, target);
            return;
        }
        let properties = Reflect.getMetadata(constants_1.PROPERTY_DEPS_METADATA, target.constructor) || [];
        properties = [...properties, { key, type }];
        Reflect.defineMetadata(constants_1.PROPERTY_DEPS_METADATA, properties, target.constructor);
    };
}
exports.Inject = Inject;
