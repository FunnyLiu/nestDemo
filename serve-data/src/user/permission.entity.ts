import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity('permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    action: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(type=>RoleEntity,role=>role.permissions)
    roles:RoleEntity[]
}