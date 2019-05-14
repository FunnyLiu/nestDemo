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
const typeorm_1 = require("@nestjs/typeorm");
const slug = require("unique-slug");
const _ = require("lodash");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_2.getRepository(product_entity_1.ProductEntity)
                .createQueryBuilder('product');
            qb.where("1 = 1");
            if ('name' in query) {
                qb.andWhere("product.name LIKE :name", { tag: `%${query.name}%` });
            }
            qb.orderBy('product.created', 'DESC');
            const productsCount = yield qb.getCount();
            if ('limit' in query) {
                qb.limit(query.limit);
            }
            if ('offset' in query) {
                qb.offset(query.offset);
            }
            const products = yield qb.getMany();
            return { products, productsCount };
        });
    }
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = new product_entity_1.ProductEntity();
            const { name } = productData;
            const slug = this.slugify(name);
            const qb = yield typeorm_2.getRepository(product_entity_1.ProductEntity)
                .createQueryBuilder('product')
                .where('product.slug = :slug', { slug })
                .orWhere('product.name = :name', { name });
            const productOne = yield qb.getOne();
            if (productOne) {
                const errors = { name: 'name must be unique.' };
                throw new common_1.HttpException({ message: 'Input data validation failed', errors }, common_1.HttpStatus.BAD_REQUEST);
            }
            product = Object.assign(_.pick(productData, ['name', 'description']));
            product.slug = this.slugify(productData.name);
            const newProduct = yield this.productRepository.save(product);
            return newProduct;
        });
    }
    update(slug, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const toUpdate = yield this.productRepository.findOne({ slug });
            const updated = Object.assign(toUpdate, productData);
            const product = yield this.productRepository.save(updated);
            return { product };
        });
    }
    delete(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.delete({ slug: slug });
        });
    }
    slugify(str) {
        return slug(str);
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
