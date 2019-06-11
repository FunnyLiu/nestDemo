import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import * as _ from 'lodash'
import { UserService } from './user.service';
import { UserRO, UserCommonDataRO, UsersRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { User } from './user.decorator';

import {
    ApiUseTags,
    ApiBearerAuth,
    ApiOperation,
    ApiImplicitQuery,
    ApiImplicitParam,
    ApiImplicitBody
} from '@nestjs/swagger';
import { UnhandleException } from '@/common/exceptions/unhandle.exception';
import { CreateUserBody } from './dto/create-user.dto';
import { UpdateUserBody, UpdateUserRoleDto, UpdateUserRoleBody } from './dto/update-user.dto';
import { LoginUserBody } from './dto/login-user.dto';
import { AnyNaptrRecord } from 'dns';
import { Roles } from '@/common/decorators/role.decorator';
import { ROLE_SUPER } from '@/common/constants/role';
import { RolesGuard } from '@/common/guards/role.guard';
// import { ValidationPipe } from '@/common/pipes/validation.pipe';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ title: 'Get own user info by email' })
    @ApiImplicitQuery({ name: 'email', type: 'string', description: 'users email' })
    @Get('user')
    async findMe(@User('email') email: string): Promise<UserRO | boolean> {
        const result = await this.userService.findByEmail(email);
        if (result) {
            return result;
        } else {
            throw new UnhandleException(`not found`);
        }

    }

    @ApiOperation({ title: 'Update on user by id' })
    @ApiImplicitQuery({ name: 'id', type: 'number' })
    @ApiImplicitBody({ name: 'user', type: UpdateUserBody })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @Put('user')
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
        return await this.userService.update(userId, userData);
    }

    @ApiOperation({ title: 'update role for user' })
    @ApiImplicitQuery({ name: 'id', type: 'number' })
    @ApiImplicitBody({ name: 'role', type: UpdateUserRoleBody })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @Put('user/role')
    async updateUserRole(@Query('id') userId: number, @Query('method') method: 'add' | 'delete', @Body('role') roleData: UpdateUserRoleDto) {
        return await this.userService.setRoleForUser(userId, method, roleData)
    }

    @ApiOperation({ title: 'Get all users' })
    @ApiImplicitQuery({ name: 'email', type: 'string', description: 'users email', required: false })
    @Get('users')
    @UseGuards(RolesGuard)
    @Roles(ROLE_SUPER)
    async findAll(@Query() query: any):Promise<UsersRO> {
        //todo: handle this Role question to set query undefined, user Guard for it
        const userInfo = await this.userService.findAll(query)
        let result = []
        userInfo.users.forEach(v => {
            let item:any = {}
            item = Object.assign(_.pick(v, ['id','username','email']))
            if(v.roles){
                let roles = []
                v.roles.forEach(role=>{
                    roles.push({
                        id:role.id,
                        name:role.name
                    })
                })
                item.roles = roles;
            }
            result.push(item)
        })
        return {
            users:result,
            usersCount:userInfo.usersCount
        }

    }

    @ApiOperation({ title: 'Create user' })
    @ApiImplicitBody({ name: 'user', type: CreateUserBody })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @Post('users')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @ApiOperation({ title: 'Delete user' })
    @ApiImplicitParam({ name: 'id', type: 'number' })
    @Delete('users/:id')
    @UseGuards(RolesGuard)
    @Roles(ROLE_SUPER)
    async delete(@Param() params: any) {
        return await this.userService.deleteUserById(params.id);
    }


    @ApiOperation({ title: 'Login' })
    @ApiImplicitBody({ name: 'user', type: LoginUserBody })
    @UsePipes(new ValidationPipe())
    @Post('users/login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(loginUserDto);

        if (!_user) throw new UnhandleException(`not found`)

        const token = await this.userService.generateJWT(_user);
        const { email, username, roles } = _user;
        let rolesList = [];
        roles.forEach(v => {
            rolesList.push(v.name)
        })
        const user = {
            email,
            token,
            username,
            roles: rolesList
        };
        return { user }
    }
}
