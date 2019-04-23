import { NestInterceptor } from '../../interfaces';
/**
 * Binds interceptors to the particular context.
 * When the `@UseInterceptors()` is used on the controller level:
 * - Interceptor will be register to each handler (every method)
 *
 * When the `@UseInterceptors()` is used on the handle level:
 * - Interceptor will be registered only to the specified method
 *
 * @param  {} ...interceptors
 */
export declare function UseInterceptors(...interceptors: (NestInterceptor | Function)[]): (target: any, key?: string, descriptor?: any) => any;
