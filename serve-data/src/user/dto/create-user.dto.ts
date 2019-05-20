import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiModelProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}



export class CreateUserBody {

  @ApiModelProperty()
  @IsNotEmpty()
  user: CreateUserDto
}
