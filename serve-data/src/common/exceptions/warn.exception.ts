import { HttpException, HttpStatus } from "@nestjs/common";

export class WarnException extends HttpException{
  constructor(message: string) {
    super({message,errorCode:-2}, HttpStatus.OK)
  }
}