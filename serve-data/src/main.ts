import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appOptions } from './common/appOptions';
import { initSwagger } from './common/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');
  initSwagger(app)

  await app.listen(3000);
}
bootstrap();