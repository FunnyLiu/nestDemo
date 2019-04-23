import { Observable } from 'rxjs';
import { ClassTransformOptions } from '../interfaces/external/class-transform-options.interface';
import { CallHandler, ExecutionContext, NestInterceptor } from './../interfaces';
export interface PlainLiteralObject {
    [key: string]: any;
}
export declare class ClassSerializerInterceptor implements NestInterceptor {
    protected readonly reflector: any;
    constructor(reflector: any);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    serialize(response: PlainLiteralObject | Array<PlainLiteralObject>, options: ClassTransformOptions): PlainLiteralObject | PlainLiteralObject[];
    transformToPlain(plainOrClass: any, options: ClassTransformOptions): PlainLiteralObject;
    private getContextOptions;
    private reflectSerializeMetadata;
}
