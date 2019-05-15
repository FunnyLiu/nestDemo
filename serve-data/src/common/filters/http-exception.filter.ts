import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status:any = exception.getStatus();
    let message:any = exception.getResponse()
    let code = status

    if(message && message.errorCode){
      code = message.errorCode
      message = message.message
    }
    this.logger.error(message)

    response
      .status(status)
      .json({
        code: code,
        timestamp: +new Date(),
        message: message
      });
  }
}