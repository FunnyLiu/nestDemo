import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorException extends HttpException{
  constructor(message: string) {
    super({message,errorCode:-3}, HttpStatus.OK)
  }
}