import {UserModel} from "./user.model";

export interface ReplyModel {
  id: string;
  user: UserModel;
  comment : string;
  tag : string;
  createdAt : Date;
}
