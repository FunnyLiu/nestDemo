import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { Repository, DeleteResult, getRepository } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { CreateRoleDto } from "./dto";
import { RoleRO, RolesRO } from "./role.interface";
import { EntityCheckService } from "@/common/service/entity-chekc.service";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RoleService {
    constructor(
        @Inject(EntityCheckService) private readonly entityCheckService: EntityCheckService,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>,
    ) { }


    async findAllRoles(query): Promise<RolesRO> {
        const qb = await this.roleRepository
            .createQueryBuilder('role')

        qb.where("1 = 1");

        if ('name' in query) {
            qb.andWhere("role.name LIKE :name", { name: `%${query.name}%` });
        }


        qb.orderBy('role.created', 'DESC');

        const rolesCount = await qb.getCount();

        if ('limit' in query) {
            qb.limit(query.limit);
        }

        if ('offset' in query) {
            qb.offset(query.offset);
        }

        qb.select('role.id')
        qb.addSelect('role.name')
        

        const roles = await qb.getMany();
        return { roles, rolesCount };
    }
    /**
     * Create a role
     * @param {CreateRoleDto} dto 
     */
    async createRole(dto: CreateRoleDto): Promise<RoleRO> {
        await this.entityCheckService.checkNameExist(RoleEntity, dto.name)
        const roleData = await this.roleRepository.save(dto)
        return { role: roleData }
    }

    async updateRole(id: number, dto: UpdateRoleDto): Promise<RoleEntity> {
        let toUpdate = await this.roleRepository.findOne(id);

        let updated = Object.assign(toUpdate, dto);
        return await this.roleRepository.save(updated);
    }

    async deleteRole(id: number): Promise<DeleteResult> {
        return await this.roleRepository.delete({ id: id });
    }

}