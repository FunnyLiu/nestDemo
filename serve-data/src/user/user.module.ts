import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';
import { RoleEntity } from './role.entity';
import { PermissionEntity } from './permission.entity';
import { RoleService } from './role.service';
import { EntityCheckService } from '@/common/service/entity-chekc.service';
import { RoleController } from './role.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        UserEntity,
        RoleEntity,
        PermissionEntity
    ])],
    providers: [
        UserService,
        RoleService,
        EntityCheckService
    ],
    controllers: [
        UserController,
        RoleController
    ],
    exports: [UserService]
})
export class UserModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UserController,RoleController)
    }
}
