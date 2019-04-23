"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("./../../services/logger.service");
/**
 * Assigns the metadata to the class/function under specified `key`.
 * This metadata can be reflected using `Reflector` class.
 */
exports.SetMetadata = (metadataKey, metadataValue) => (target, key, descriptor) => {
    if (descriptor) {
        Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value);
        return descriptor;
    }
    Reflect.defineMetadata(metadataKey, metadataValue, target);
    return target;
};
const logger = new logger_service_1.Logger('ReflectMetadata');
/**
 * @deprecated
 */
exports.ReflectMetadata = (metadataKey, metadataValue) => {
    logger.warn(`DEPRECATED! The @ReflectMetadata() decorator has been deprecated within the 6.0.0 release. Please, use @SetMetadata() instead.`);
    return exports.SetMetadata(metadataKey, metadataValue);
};
