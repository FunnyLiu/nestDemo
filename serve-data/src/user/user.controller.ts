import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import * as _ from 'lodash'
import { UserService } from './user.service';
import { UserRO, UserCommonDataRO } from './user.interface';
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
import { UpdateUserBody } from './dto/update-user.dto';
import { LoginUserBody } from './dto/login-user.dto';
import { AnyNaptrRecord } from 'dns';
// import { ValidationPipe } from '@/common/pipes/validation.pipe';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ title: 'Get my info by email'})
    @ApiImplicitQuery({ name: 'email', type: 'string', description:'users email'})
    @Get('user')
    // async findMe(@User('email') email: string): Promise<UserRO> {
    async findMe(@Query('email') email: string): Promise<UserRO|boolean> {
        const result =  await this.userService.findByEmail(email);
        if(result){
            return result;
        } else {
            throw new UnhandleException(`not found`);
        }

    }

    @ApiOperation({ title: 'Update on user by id'})
    @ApiImplicitQuery({name:'id',type:'number'})
    @ApiImplicitBody({name:'user',type:UpdateUserBody})
    @UsePipes(new ValidationPipe({whitelist: true,forbidNonWhitelisted: true }))
    @Put('user')
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
        return await this.userService.update(userId, userData);
    }

    @ApiOperation({ title: 'Get one user by email'})
    @ApiImplicitQuery({ name: 'email', type: 'string', description:'users email'})
    @Get('users')
    async find(@Query('email') email: string): Promise<UserCommonDataRO|false> {
        const result =  await this.userService.findByEmail(email);
        let response:any = {}
        if(result){
            response.user = Object.assign(_.pick(result.user, ['email']))
            return response
        }else{
            return false
        }
    }

    @ApiOperation({ title: 'Create user'})
    @ApiImplicitBody({name:'user',type:CreateUserBody})
    @UsePipes(new ValidationPipe({whitelist: true,forbidNonWhitelisted: true }))
    @Post('users')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @ApiOperation({title: 'Delete user'})
    @ApiImplicitParam({name:'slug',type:'string'})
    @Delete('users/:slug')
    async delete(@Param() params:any) {
        console.log(params.slug)
        return await this.userService.delete(params.slug);
    }


    @ApiOperation({title: 'Login'})
    @ApiImplicitBody({name:'user',type:LoginUserBody})
    @UsePipes(new ValidationPipe())
    @Post('users/login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(loginUserDto);

        if (!_user) throw new UnhandleException(`not found`)

        const token = await this.userService.generateJWT(_user);
        const { email, username } = _user;
        const user = { email, token, username };
        return { user }
    }
}
