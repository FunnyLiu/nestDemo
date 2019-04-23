import { RequestMappingMetadata } from '../../interfaces/request-mapping-metadata.interface';
export declare const RequestMapping: (metadata?: RequestMappingMetadata) => MethodDecorator;
/**
 * Routes HTTP POST requests to the specified path.
 */
export declare const Post: (path?: string | string[]) => MethodDecorator;
/**
 * Routes HTTP GET requests to the specified path.
 */
export declare const Get: (path?: string | string[]) => MethodDecorator;
/**
 * Routes HTTP DELETE requests to the specified path.
 */
export declare const Delete: (path?: string | string[]) => MethodDecorator;
/**
 * Routes HTTP PUT requests to the specified path.
 */
export declare const Put: (path?: string | string[]) => MethodDecorator;
/**
 * Routes HTTP PATCH requests to the specified path.
 */
export declare const Patch: (path?: string | string[]) => MethodDecorator;
/**
 * Routes HTTP OPTIONS requests to the specified path.
 */
export declare const Options: (path?: string | string[]) => MethodDecorator;
/**
 * Routes HTTP HEAD requests to the specified path.
 */
export declare const Head: (path?: string | string[]) => MethodDecorator;
/**
 * Routes all HTTP requests to the specified path.
 */
export declare const All: (path?: string | string[]) => MethodDecorator;
