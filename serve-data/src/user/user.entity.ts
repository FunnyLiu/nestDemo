import * as crypto from 'crypto'
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail } from "class-validator";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({default: ''})
    nickname: string;

    @Column({default: ''})
    fullname: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256',this.password).digest('hex')
    }

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}