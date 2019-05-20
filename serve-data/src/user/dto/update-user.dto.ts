import { ApiModelProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class UpdateUserDto {

  @ApiModelProperty()
  @Allow()
  readonly username: string;
}

export class UpdateUserBody {
  @ApiModelProperty()
  user: UpdateUserDto
}