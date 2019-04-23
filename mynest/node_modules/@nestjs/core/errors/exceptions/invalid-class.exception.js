"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../messages");
const runtime_exception_1 = require("./runtime.exception");
class InvalidClassException extends runtime_exception_1.RuntimeException {
    constructor(value) {
        super(messages_1.INVALID_CLASS_MESSAGE `${value}`);
    }
}
exports.InvalidClassException = InvalidClassException;
