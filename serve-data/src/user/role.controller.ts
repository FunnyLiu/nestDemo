import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiImplicitBody } from "@nestjs/swagger";
import { Controller, Body, UsePipes, ValidationPipe, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto";
import { CreateRoleBody } from "./dto/create-role.dto";

@ApiBearerAuth()
@ApiUseTags('role')
@Controller()
export class RoleController {
    constructor(private readonly roleService: RoleService){

    }

    @ApiOperation({ title: 'Create Role'})
    @ApiImplicitBody({name:'role',type:CreateRoleBody})
    @UsePipes(new ValidationPipe({whitelist: true,forbidNonWhitelisted: true }))
    @Post('role')
    async create(@Body('role') roleData: CreateRoleDto){
        return this.roleService.createRole(roleData)
    }
}