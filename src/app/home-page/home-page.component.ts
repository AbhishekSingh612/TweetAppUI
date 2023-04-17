import {Component, OnInit} from '@angular/core';
import {TweetModel} from "../model/tweet.model";
import {LogService} from "../service/log.service";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
import {UserModel} from "../model/user.model";
import {CommonService} from "../service/common.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  tweetDataList: TweetModel[];
  user?: UserModel;

  isLoadingPost: boolean;
  isLoadingTweets: boolean = true;

  isFetching:boolean = true;

  constructor(private logger: LogService, private apiService: ApiService,
              private authService: AuthService, private common: CommonService) {
    this.tweetDataList = [];
    this.isLoadingPost = true;
    this.isLoadingTweets = true;
    this.isFetching = true;
  }

  ngOnInit(): void {
    this.tweetDataList = [];
    this.isLoadingPost = true;
    this.isLoadingTweets = true;
    this.isFetching = true;

    this.apiService.getCurrentUserDetails()
      .subscribe((user) => {
          this.isLoadingPost = false;
          this.logger.log("Current user detail ");
          this.logger.log(user);
          this.user = user;
        },
        (error) => {
          this.isLoadingPost = false;
          this.logger.log(error)
        });

    this.common.tweetDataList$
      .subscribe(
        (success) => {
          this.logger.log(success)
          this.tweetDataList = success;
          this.isFetching = this.common.isFetching;
        }, (error) => {
          this.isFetching = this.common.isFetching;
          this.logger.log(error)
        });


  }

  trackByFn(index: any, item: TweetModel) {
    return item.tweetId;
  }

  sortedList() {
    return this.tweetDataList.sort(
      (a, b) => (a.createdAt < b.createdAt) ? 1 : (a.createdAt == b.createdAt) ? 0 : -1);
  }
}
