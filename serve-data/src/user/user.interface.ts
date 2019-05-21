import { CreateUserDto } from "./dto";

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
