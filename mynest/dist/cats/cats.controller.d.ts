import { Request } from 'express';
import { CreateCatDto } from './dto/cat.dto';
import { CatsService } from './cat.service';
import { Cat } from './interfaces/cat.interface';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    findAll(): string;
    findOne(): string;
    findByName(request: Request, cookie: string): any;
    useOwnDecorator(str: string): string;
    create(): string;
    createByDecorator(createCatDto: CreateCatDto): Promise<string>;
    createByService(createCatDto: CreateCatDto): Promise<void>;
    findAllByService(): Promise<Cat[]>;
}
