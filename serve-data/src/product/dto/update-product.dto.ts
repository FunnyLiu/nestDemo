import { ApiModelProperty } from "@nestjs/swagger";

export class UpdateProductDto {

  @ApiModelProperty()
  readonly description: string;
}
