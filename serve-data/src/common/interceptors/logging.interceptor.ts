import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  
  private readonly logger = new Logger(LoggingInterceptor.name)
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //get request object
    const request = context.switchToHttp().getRequest()
    const info = `${context.getClass().name} ${request.url} ${JSON.stringify(request.body)}`
    this.logger.log(`BGN ${info}`)
    
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          this.logger.log(`END ${info} +${Date.now() - now}ms`)
        }),
      );
  }
}