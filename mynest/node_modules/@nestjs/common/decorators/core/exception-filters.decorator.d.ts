import { ExceptionFilter } from '../../index';
/**
 * Bounds exception filters to the chosen context.
 * When the `@UseFilters()` is used on the controller level:
 * - Exception Filter will be set up to every handler (every method)
 *
 * When the `@UseFilters()` is used on the handle level:
 * - Exception Filter will be set up only to the specified method
 *
 * @param  {ExceptionFilter[]} ...filters
 */
export declare const UseFilters: (...filters: (Function | ExceptionFilter<any>)[]) => (target: any, key?: string, descriptor?: any) => any;
