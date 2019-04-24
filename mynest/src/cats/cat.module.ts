import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cat.service";


@Module({
    controllers:[CatsController],
    providers:[CatsService],
    //now any module that imports the CatModule has access
    //to the CatsService and will share the same instance 
    //with ohter modules that import it as well
    exports:[CatsService]
})

export class CatsModule{}