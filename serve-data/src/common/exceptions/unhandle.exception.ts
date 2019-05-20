import { HttpException, HttpStatus } from "@nestjs/common";

export class UnhandleException extends HttpException{
  constructor(message: string) {
    super({message,errorCode:-1}, HttpStatus.OK)
  }
}