import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from ".0.9.1@class-validator";

export class CreateProductDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;
}
