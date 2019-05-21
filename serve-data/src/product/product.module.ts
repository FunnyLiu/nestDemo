import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { RedisModule } from 'src/redis/redis.module';
import { AuthMiddleware } from '@/user/auth.middleware';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    UserModule
    // RedisModule
  ],
  providers: [ProductService],
  controllers: [
    ProductController
  ]
})
export class ProductModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes({path: 'products/:slug', method: RequestMethod.DELETE})
  }
}
