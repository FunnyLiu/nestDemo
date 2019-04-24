import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function): void;
}
