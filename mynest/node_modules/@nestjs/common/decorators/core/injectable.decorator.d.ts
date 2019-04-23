import { ScopeOptions } from '../../interfaces/scope-options.interface';
import { Type } from './../../interfaces/type.interface';
export interface InjectableOptions extends ScopeOptions {
}
/**
 * Defines the injectable class. This class can inject dependencies through constructor.
 * Those dependencies have to belong to the same module.
 */
export declare function Injectable(options?: InjectableOptions): ClassDecorator;
export declare function mixin(mixinClass: Type<any>): Type<any>;
