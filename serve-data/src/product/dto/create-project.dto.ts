import { ApiModelProperty } from "@nestjs/swagger";

export class CreateProjectDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;
}
