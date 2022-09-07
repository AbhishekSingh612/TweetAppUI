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

  constructor(private logger: LogService, private apiService: ApiService,
              private authService: AuthService, private common: CommonService) {
    this.tweetDataList = [];
  }

  ngOnInit(): void {

    this.apiService.getCurrentUserDetails()
      .subscribe((user) => {
          this.logger.log("Current user detail ");
          this.logger.log(user);
          this.user = user;
        },
        (error) => {
          this.logger.log(error)
        });

    this.common.tweetDataList$
      .subscribe(
        (success) => {
          this.logger.log(success)
          this.tweetDataList = success;
        }, (error) => {
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
