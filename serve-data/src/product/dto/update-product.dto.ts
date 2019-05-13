import { ApiModelProperty } from "@nestjs/swagger";
import { Allow } from ".0.9.1@class-validator";

export class UpdateProductDto {

  @ApiModelProperty()
  @Allow()
  readonly description: string;
}
