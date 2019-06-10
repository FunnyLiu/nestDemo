import { RoleEntity } from "./role.entity";

export interface RoleData {
    name: string;
}

export interface RoleRO {
    role: RoleData
}

export interface RolesRO {
    roles: RoleEntity[];
    rolesCount: number;
}