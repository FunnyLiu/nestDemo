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
const product_service_1 = require("./product.service");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.findAll(query);
        });
    }
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.create(productData);
        });
    }
    update(params, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.update(params.slug, productData);
        });
    }
    delete(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.delete(params.slug);
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ title: 'Get all products' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return all products.' }),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOperation({ title: 'Create product' }),
    swagger_1.ApiResponse({ status: 201, description: 'The product has been successfully created.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ title: 'Update product' }),
    swagger_1.ApiImplicitParam({ name: 'slug', type: 'string', description: 'project slug', required: true }),
    swagger_1.ApiResponse({ status: 201, description: 'The product has been successfully updated.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    common_1.Put(':slug'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    swagger_1.ApiOperation({ title: 'Delete product' }),
    swagger_1.ApiImplicitParam({ name: 'slug', type: 'string', description: 'project slug', required: true }),
    swagger_1.ApiResponse({ status: 201, description: 'The product has been successfully deleted.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    common_1.Delete(':slug'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('products'),
    common_1.Controller('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
