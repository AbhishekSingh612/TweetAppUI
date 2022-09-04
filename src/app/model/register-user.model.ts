import {UserModel} from "./user.model";

export interface RegisterUserModel extends UserModel{
  password:string;
  confirmPassword: string;
}
