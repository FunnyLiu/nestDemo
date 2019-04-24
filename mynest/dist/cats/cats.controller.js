"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const MyD_decorator_1 = require("../decorators/MyD.decorator");
const cat_dto_1 = require("./dto/cat.dto");
const cat_service_1 = require("./cat.service");
let CatsController = class CatsController {
    constructor(catsService) {
        this.catsService = catsService;
    }
    findAll() {
        return 'This action returns all cats';
    }
    findOne() {
        return 'this is one cat';
    }
    findByName(request, cookie) {
        console.log(request);
        console.log(cookie);
    }
    useOwnDecorator(str) {
        console.log(str);
        return str;
    }
    create() {
        return 'this is a new created cat by post method';
    }
    createByDecorator(createCatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return `this is adds a new cat,${createCatDto.name} ${createCatDto.age} ${createCatDto.bread}`;
        });
    }
    createByService(createCatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.catsService.create(createCatDto);
        });
    }
    findAllByService() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.catsService.findAll();
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], CatsController.prototype, "findAll", null);
__decorate([
    common_1.Get('one'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], CatsController.prototype, "findOne", null);
__decorate([
    common_1.Get('request'),
    __param(0, common_1.Req()), __param(1, common_1.Headers('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], CatsController.prototype, "findByName", null);
__decorate([
    common_1.Get('useOwnDecorator'),
    __param(0, MyD_decorator_1.MyD('hello')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], CatsController.prototype, "useOwnDecorator", null);
__decorate([
    common_1.Post('create'),
    common_1.HttpCode(200),
    common_1.Header('Cache-Control', 'none'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], CatsController.prototype, "create", null);
__decorate([
    common_1.Post('createByDecorator'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cat_dto_1.CreateCatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "createByDecorator", null);
__decorate([
    common_1.Post('createByService'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cat_dto_1.CreateCatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "createByService", null);
__decorate([
    common_1.Get('findAllByService'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findAllByService", null);
CatsController = __decorate([
    common_1.Controller('cats'),
    __metadata("design:paramtypes", [cat_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map