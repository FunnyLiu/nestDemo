import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { Repository } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { CreateRoleDto } from "./dto";
import { RoleRO } from "./role.interface";
import { EntityCheckService } from "@/common/service/entity-chekc.service";

@Injectable()
export class RoleService {
    constructor(
        @Inject(EntityCheckService) private readonly entityCheckService: EntityCheckService,
        @InjectRepository(RoleEntity)
        private readonly roleRepository:Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository:Repository<PermissionEntity>,
    ){}

    async createRole(dto:CreateRoleDto):Promise<RoleRO>{
        await this.entityCheckService.checkNameExist(RoleEntity,dto.name)
        const roleData = await this.roleRepository.save(dto)
        return {role:roleData}
    }
}