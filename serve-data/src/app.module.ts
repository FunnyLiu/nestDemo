import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot()
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
