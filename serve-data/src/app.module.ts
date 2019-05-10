import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
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
