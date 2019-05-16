import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appOptions } from './common/appOptions';
import { initSwagger } from './common/swagger';
import { AppLogger } from './logger/logger.service';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, appOptions);
  //not enabled temporarily, and will be used again when it needs to be unified in the future.
  // app.useLogger(app.get(AppLogger))
  app.useGlobalInterceptors(new TimeoutInterceptor())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())

  app.useGlobalFilters(new HttpExceptionFilter())

  app.setGlobalPrefix('api');
  initSwagger(app)
  await app.listen(80);
}
bootstrap();