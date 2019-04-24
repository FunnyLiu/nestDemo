import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cat.service';

@Module({
  imports: [],
  controllers: [AppController,CatsController],
  providers: [AppService,CatsService],
})
export class AppModule {}
