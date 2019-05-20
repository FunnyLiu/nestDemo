import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class LoginUserBody {
  @ApiModelProperty()
  user:LoginUserDto
}