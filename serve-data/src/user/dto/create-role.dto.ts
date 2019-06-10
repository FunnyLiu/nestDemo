import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRoleDto {

  @ApiModelProperty()
  @IsNotEmpty()
  readonly name: string;
}


export class CreateRoleBody {

    @ApiModelProperty()
    @IsNotEmpty()
    role: CreateRoleDto
  }
  