import { ApiModelProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class UpdateRoleDto {

  @ApiModelProperty()
  @Allow()
  readonly name: string;
}

export class UpdateRoleBody {
  @ApiModelProperty()
  role: UpdateRoleDto
}