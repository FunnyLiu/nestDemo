"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.MyD = common_1.createParamDecorator((data, req) => {
    return `${data}: ${req.originalUrl}`;
});
exports.default = {
    MyD: exports.MyD
};
//# sourceMappingURL=MyD.decorator.js.map