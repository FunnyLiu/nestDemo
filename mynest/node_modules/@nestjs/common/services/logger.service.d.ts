export interface LoggerService {
    log(message: any, context?: string): any;
    error(message: any, trace?: string, context?: string): any;
    warn(message: any, context?: string): any;
    debug?(message: any, context?: string): any;
    verbose?(message: any, context?: string): any;
}
export declare class Logger implements LoggerService {
    private readonly context?;
    private readonly isTimestampEnabled;
    private static lastTimestamp?;
    private static instance?;
    constructor(context?: string, isTimestampEnabled?: boolean);
    error(message: any, trace?: string, context?: string): void;
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
    static overrideLogger(logger: LoggerService | boolean): void;
    static log(message: any, context?: string, isTimeDiffEnabled?: boolean): void;
    static error(message: any, trace?: string, context?: string, isTimeDiffEnabled?: boolean): void;
    static warn(message: any, context?: string, isTimeDiffEnabled?: boolean): void;
    static debug(message: any, context?: string, isTimeDiffEnabled?: boolean): void;
    static verbose(message: any, context?: string, isTimeDiffEnabled?: boolean): void;
    private callFunction;
    private getInstance;
    private static printMessage;
    private static printTimestamp;
    private static printStackTrace;
}
