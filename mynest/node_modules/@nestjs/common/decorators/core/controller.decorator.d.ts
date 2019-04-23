import { ScopeOptions } from './../../interfaces/scope-options.interface';
export interface ControllerOptions extends ScopeOptions {
    path?: string;
}
/**
 * Defines the controller. Controller can inject dependencies through constructor.
 * Those dependencies have to belong to the same module.
 */
export declare function Controller(): ClassDecorator;
export declare function Controller(prefix: string): ClassDecorator;
export declare function Controller(options: ControllerOptions): ClassDecorator;
