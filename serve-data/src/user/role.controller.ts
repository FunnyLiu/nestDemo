import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiImplicitBody, ApiImplicitQuery } from "@nestjs/swagger";
import { Controller, Body, UsePipes, ValidationPipe, Post, Put, Param, Query, Get } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto";
import { CreateRoleBody } from "./dto/create-role.dto";
import { UpdateRoleBody, UpdateRoleDto } from "./dto/update-role.dto";
import { RoleRO, RolesRO } from "./role.interface";

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

    @ApiOperation({ title: 'Update Role Info by id'})
    @ApiImplicitQuery({name:'id',type:'number'})
    @ApiImplicitBody({name:'role',type:UpdateRoleBody})
    @UsePipes(new ValidationPipe({whitelist: true,forbidNonWhitelisted: true }))
    @Put('role')
    async update(@Query('id') roleId: number, @Body('role') roleData: UpdateRoleDto) {
        return await this.roleService.updateRole(roleId, roleData);
    }

    @ApiOperation({ title: 'Get all Roles' })
    @ApiImplicitQuery({ name:'name', type: 'string', description:'role name',required: false})
    @Get('roles')
    async findAll(@Query() query): Promise<RolesRO> {
      return await this.roleService.findAllRoles(query);
    }


}