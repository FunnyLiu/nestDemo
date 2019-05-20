import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';

import {
    ApiUseTags,
    ApiBearerAuth
} from '@nestjs/swagger';
import { UnhandleException } from '@/common/exceptions/unhandle.exception';
import { ValidationPipe } from '@/common/pipes/validation.pipe';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('user')
    async findMe(@User('email') email: string): Promise<UserRO> {
        return await this.userService.findByEmail(email);
    }

    @Put('user')
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
        return await this.userService.update(userId, userData);
    }

    @UsePipes(new ValidationPipe())
    @Post('users')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @Delete('users/:slug')
    async delete(@Param() params) {
        return await this.userService.delete(params.slug);
    }

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
