import { Type } from '../../interfaces';
/**
 * Defines an exception filter. Takes set of exception types as arguments which have to be caught by this filter.
 * The class should implement the `ExceptionFilter` interface.
 */
export declare function Catch(...exceptions: Type<any>[]): ClassDecorator;
