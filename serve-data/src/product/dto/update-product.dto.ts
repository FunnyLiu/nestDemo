import { ApiModelProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class UpdateProductDto {

  @ApiModelProperty()
  @Allow()
  readonly description: string;
}
