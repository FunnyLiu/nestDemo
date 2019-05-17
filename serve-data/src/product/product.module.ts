import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]),RedisModule],
  providers: [ProductService],
  controllers: [
    ProductController
  ]
})
export class ProductModule {

}
