import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, Allow } from ".0.9.1@class-validator";

export class CreateProductDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty()
  @Allow()
  readonly description: string;
}
