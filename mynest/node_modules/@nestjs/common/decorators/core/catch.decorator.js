"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
/**
 * Defines an exception filter. Takes set of exception types as arguments which have to be caught by this filter.
 * The class should implement the `ExceptionFilter` interface.
 */
function Catch(...exceptions) {
    return (target) => {
        Reflect.defineMetadata(constants_1.FILTER_CATCH_EXCEPTIONS, exceptions, target);
    };
}
exports.Catch = Catch;
