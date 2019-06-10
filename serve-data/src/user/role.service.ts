import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { Repository } from "typeorm";
import { PermissionEntity } from "./permission.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository:Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository:Repository<PermissionEntity>,
    ){}
}