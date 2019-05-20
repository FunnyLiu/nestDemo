import { CreateUserDto } from "./dto";

export interface UserData {
  username: string;
  email: string;
  token: string;
}

export interface UserRO {
  user: UserData;
}
