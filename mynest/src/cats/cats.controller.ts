import {
  Controller,
  Get,
  Req,
  Headers,
  Post,
  HttpCode,
  Header,
  Body,
  HttpException,
  HttpStatus,
  ForbiddenException,
  UseFilters,
  UsePipes
} from "@nestjs/common";
import { Request } from "express";

import { MyD } from "../decorators/MyD.decorator";
import { CreateCatDto } from "./dto/cat.dto";
import { CatsService } from "./cat.service";
import { Cat } from "./interfaces/cat.interface";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { ValidationPipe } from "src/common/pipes/validation.pipe";

@Controller("cats")
//this is the path name, now GET /cats will return the result
export class CatsController {
  //incoming service to constructor
  constructor(private readonly catsService: CatsService) {}
  @Get()
  // this decorator tells Nest to create a handler for a http get request
  findAll(): string {
    return "This action returns all cats";
  }
  @Get("one")
  //now GET /cats/one will return the result
  findOne(): string {
    return "this is one cat";
  }
  @Get("request")
  findByName(@Req() request: Request, @Headers("cookie") cookie: string): any {
    //get request object by decorator Req
    console.log(request);
    console.log(cookie);
    //there are some buildin decorators to handle request ,
    //read here: https://docs.nestjs.com/custom-decorators#param-decorators
  }
  //use a custom decorator, which is created in /decorators/MyD.decorator
  @Get("useOwnDecorator")
  useOwnDecorator(@MyD("hello") str: string): string {
    console.log(str);
    return str;
  }
  //a post methods
  //there are others such as Put,Delete,Path,Options...
  //read here for more details: https://docs.nestjs.com/controllers#resources
  @Post("create")
  @HttpCode(200) //http code ,default is 200
  @Header("Cache-Control", "none") //http header
  create(): string {
    return "this is a new created cat by post method";
  }

  @Post("createByDecorator")
  async createByDecorator(@Body() createCatDto: CreateCatDto) {
    return `this is adds a new cat,${createCatDto.name} ${createCatDto.age} ${
      createCatDto.bread
    }`;
  }
  //some method based on service
  @Post("createByService")
  async createByService(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get("findAllByService")
  async findAllByService(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  /**
   * A exception
   */
  @Get("findWithError")
  async findWithError() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: "this is a custom message"
      },
      403
    );
    //client will receive result:
    // {
    //   "status": 403,
    //   "error": "this is a custom message"
    // }
  }
  /**
   * There are a lot of build-in Exception Class
   */
  @Get("findWithBuildinError")
  async findWithBuildinError() {
    throw new ForbiddenException("this is a build-in forbidden error");
    //client will receive result:
    // {
    //   "statusCode": 403,
    //   "error": "Forbidden",
    //   "message": "this is a build-in forbidden error"
    // }
  }

  /**
   * Use a custom filter to throw error
   */
  @Get("findWithFilter")
  @UseFilters(new HttpExceptionFilter())
  async findWithFilter() {
    throw new ForbiddenException();
  }
  //client will receive result:
  //   {
  //     "statusCode": 403,
  //     "timestamp": "2019-04-24T03:26:01.095Z",
  //     "path": "/cats/findWithFilter"
  // }

  @Post('createWithPipe')
  //use pipe to validate data structure and type
  @UsePipes(new ValidationPipe())
  async createWithPipe(@Body() createCatDto:CreateCatDto){
    this.catsService.create(createCatDto)
    return 'ok'
  }
}
