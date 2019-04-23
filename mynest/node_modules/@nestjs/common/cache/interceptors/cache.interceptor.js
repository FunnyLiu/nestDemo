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
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const decorators_1 = require("../../decorators");
const cache_constants_1 = require("../cache.constants");
const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
const REFLECTOR = 'Reflector';
let CacheInterceptor = class CacheInterceptor {
    constructor(cacheManager, reflector) {
        this.cacheManager = cacheManager;
        this.reflector = reflector;
    }
    async intercept(context, next) {
        const key = this.trackBy(context);
        if (!key) {
            return next.handle();
        }
        try {
            const value = await this.cacheManager.get(key);
            if (value) {
                return rxjs_1.of(value);
            }
            return next
                .handle()
                .pipe(operators_1.tap(response => this.cacheManager.set(key, response)));
        }
        catch (_a) {
            return next.handle();
        }
    }
    trackBy(context) {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
        if (!isHttpApp) {
            return this.reflector.get(cache_constants_1.CACHE_KEY_METADATA, context.getHandler());
        }
        const request = context.getArgByIndex(0);
        if (httpAdapter.getRequestMethod(request) !== 'GET') {
            return undefined;
        }
        return httpAdapter.getRequestUrl(request);
    }
};
__decorate([
    decorators_1.Optional(),
    decorators_1.Inject(HTTP_ADAPTER_HOST),
    __metadata("design:type", Object)
], CacheInterceptor.prototype, "httpAdapterHost", void 0);
CacheInterceptor = __decorate([
    decorators_1.Injectable(),
    __param(0, decorators_1.Inject(cache_constants_1.CACHE_MANAGER)),
    __param(1, decorators_1.Inject(REFLECTOR)),
    __metadata("design:paramtypes", [Object, Object])
], CacheInterceptor);
exports.CacheInterceptor = CacheInterceptor;
