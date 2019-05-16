import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, Allow } from "class-validator";

export class CreateProductDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty()
  @Allow()
  readonly description: string;
}
