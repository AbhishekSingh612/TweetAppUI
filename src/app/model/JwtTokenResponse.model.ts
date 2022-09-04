import {UserModel} from "./user.model";

export interface JwtTokenResponseModel{
  token: string;
  expiryDateMs : number;
  user: string;
}
