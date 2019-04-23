"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("./shared.utils");
exports.createHttpExceptionBody = (message, error, statusCode) => {
    if (!message) {
        return { statusCode, error };
    }
    return shared_utils_1.isObject(message) && !Array.isArray(message)
        ? message
        : { statusCode, error, message };
};
