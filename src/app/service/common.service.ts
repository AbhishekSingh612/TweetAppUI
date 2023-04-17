import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {LogService} from "./log.service";
import {TweetModel} from "../model/tweet.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  tweetDataList: TweetModel[] = [];
  tweetDataList$ = new BehaviorSubject<TweetModel[]>([]);

  isFetching = true;
  isEmpty = true;
  isEmpty$ = new BehaviorSubject<boolean>(true);


  constructor(private apiService: ApiService, private logger: LogService) {
    this.getAllTweets();
  }

  getAllTweets() {
    this.apiService.getAllTweets().subscribe(
      (list) => {
        this.isFetching = false;
        this.logger.log(list)
        if (list.length > 0) {
          this.isEmpty = false;
          this.isEmpty$.next(this.isEmpty);
        }
        this.tweetDataList = list;
        this.tweetDataList$.next(this.tweetDataList);
      }, (error) => {
        this.logger.log(error)
      });
  }


  postTweet(content: any, tag: any, username: any) {
    this.apiService.postTweet(content, tag, username).subscribe(
      (tweet) => {
        this.tweetDataList.push(tweet);
        this.tweetDataList$.next(this.tweetDataList);

        if (this.tweetDataList.length > 0) {
          this.isEmpty = false;
          this.isEmpty$.next(this.isEmpty);
        }

      }, (error) => {
        this.logger.log(error)
      }
    );
  }

  deleteTweet(tweetId: any, userId: any) {
    this.apiService.deleteTweet(tweetId, userId).subscribe(
      () => {
        this.deleteItemFromList(tweetId);
        this.tweetDataList$.next(this.tweetDataList);

        this.logger.log("deleted tweet with id : " + tweetId);
        if (this.tweetDataList.length > 0) {
          this.isEmpty = false;
          this.isEmpty$.next(this.isEmpty);
        }

      }, (error) => {
        this.logger.log(error)
      }
    );

  }

  private deleteItemFromList(tweetId: any) {
    this.tweetDataList.splice(this.tweetDataList.findIndex((item) => {
      return item.tweetId === tweetId
    }), 1);
  }

  updateTweet(tweetId: string | undefined, value: any, tag: any, userId: string | undefined) {
    this.apiService.updateTweet(tweetId, value, tag, userId).subscribe(
      (tweet) => {
        this.logger.log("update content :" + value);
        let index = this.tweetDataList.findIndex((item) => item.tweetId === tweet.tweetId);
        this.tweetDataList[index] = Object.assign({}, this.tweetDataList[index], {content: tweet.content});
        this.tweetDataList$.next(this.tweetDataList);
      },
      (error) => {
        this.logger.log(error)
      }
    );
  }

  toggleLike(tweet: TweetModel | undefined, userId: string | undefined) {

    let tweetId = tweet?.tweetId;
    this.logger.log("like tweet  :" + tweetId);
    let index = this.tweetDataList.findIndex((item) => item.tweetId === tweet?.tweetId);
    this.tweetDataList[index] = Object.assign({}, this.tweetDataList[index], {likedBy: tweet?.likedBy});
    this.tweetDataList$.next(this.tweetDataList);

  }

  replyTweet(tweet: TweetModel | undefined) {

    let tweetId = tweet?.tweetId;
    this.logger.log("like tweet  :" + tweetId);
    let index = this.tweetDataList.findIndex((item) => item.tweetId === tweet?.tweetId);
    this.tweetDataList[index] = Object.assign({}, this.tweetDataList[index], {replies: tweet?.replies});
    this.tweetDataList$.next(this.tweetDataList);

  }
}
