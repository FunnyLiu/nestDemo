import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { UserEntity } from "./user.entity";
import { PermissionEntity } from "./permission.entity";

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique:true
    })
    name: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(type=>UserEntity,user=>user.roles)
    users: UserEntity[]

    @ManyToMany(type=>PermissionEntity,permission=>permission.roles)
    @JoinTable()
    permissions:PermissionEntity[]
}