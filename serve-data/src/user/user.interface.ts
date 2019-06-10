import { CreateUserDto } from "./dto";
import { UserEntity } from "./user.entity";

export interface UserData {
  username: string;
  email: string;
  token: string;
}

export interface UserCommonData {
  email: string
}


export interface UserRO {
  user: UserData;
}

export interface UserCommonDataRO {
  user: UserCommonData
}

export interface UsersRO {
  users: UserEntity[],
  usersCount: number
}