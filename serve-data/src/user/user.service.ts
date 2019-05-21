import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository, getRepository, DeleteResult } from "typeorm";
import { LoginUserDto, CreateUserDto, UpdateUserDto } from "./dto";
import { UserRO } from './user.interface';
import { WarnException } from '@/common/exceptions/warn.exception';
import { SECRET } from './user.constants';
import { validate } from 'class-validator';
import { UnhandleException } from '@/common/exceptions/unhandle.exception';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const findOneOptions = {
            email: loginUserDto.email,
            password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
        };

        return await this.userRepository.findOne(findOneOptions);
    }

    async create(dto: CreateUserDto): Promise<UserRO> {
        // check uniqueness of username/email
        const { username, email, password } = dto;
        const qb = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email });

        const user = await qb.getOne();

        if (user) {
            throw new WarnException(`Username and email must be unique`)
        }

        // create new user
        let newUser = new UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new WarnException(`${errors[0]}`)
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return this.buildUserRO(savedUser);
        }

    }


    async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
        let toUpdate = await this.userRepository.findOne(id);

        let updated = Object.assign(toUpdate, dto);
        return await this.userRepository.save(updated);
    }

    async delete(email: string): Promise<DeleteResult> {
        return await this.userRepository.delete({ email: email });
    }


    async findById(id: number): Promise<UserRO> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new UnhandleException(`not found`);
        };

        return this.buildUserRO(user);
    }

    async findByEmail(email: string): Promise<UserRO|false> {
        const user = await this.userRepository.findOne({ email: email });

        if (!user) {
            return false;
        };

        return this.buildUserRO(user);
    }


    public generateJWT(user: UserEntity) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, SECRET);
    };

    private buildUserRO(user: UserEntity) {
        const userRO = {
            username: user.username,
            email: user.email,
            token: this.generateJWT(user)
        };

        return { user: userRO };
    }
}