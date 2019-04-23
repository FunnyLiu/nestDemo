"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
/**
 * Redirects request.
 */
function Redirect(url) {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.REDIRECT_METADATA, url, descriptor.value);
        return descriptor;
    };
}
exports.Redirect = Redirect;
