import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductModule } from './product/product.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    HealthModule,
    LoggerModule,
    ProductModule
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
