import {ReplyModel} from "./reply.model";
import {UserModel} from "./user.model";

export interface TweetModel {
  tweetId: string;
  author: UserModel;
  content: string;
  tag: string;
  createdAt: Date;
  likedBy: string[];
  replies: ReplyModel[];
}
