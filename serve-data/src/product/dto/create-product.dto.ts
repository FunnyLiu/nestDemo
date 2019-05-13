import { ApiModelProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;
}
