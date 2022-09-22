import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../service/log.service";
import {ApiService} from "../service/api.service";
import {UserModel} from "../model/user.model";
import {TweetModel} from "../model/tweet.model";
import {CommonService} from "../service/common.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  userid: string;
  routeSub: any;
  user!: UserModel;
  tweets: TweetModel[] = [];
  isLoading: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private common: CommonService, private logger: LogService, private apiService: ApiService) {
    this.userid = '';
    this.isLoading = true;
    this.tweets = [];
  }

  ngOnInit(): void {
    this.tweets = [];
    this.isLoading = true;
    this.routeSub = this.activatedRoute.paramMap.subscribe(params => {

      this.userid = params.get('id')!;
      this.logger.log(this.userid);
      this.getData();
    });

  }

  private getData() {
    this.logger.log('Get Data 1');
    this.logger.log(this.userid);

    if (this.userid != null && this.userid != '') {
      this.apiService.getUserDetails(this.userid).subscribe(
        (user) => {
          this.isLoading = false;
          this.user = user
        },
        (error) => {
          this.isLoading = false;
          this.logger.log('Get Data');
          this.logger.log(error);
          this.router.navigateByUrl('user-not-found');
        });
      this.apiService.getAllUserTweets(this.userid).subscribe(tweets => {
        this.tweets = tweets;
        this.logger.log(this.tweets);
      });

    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  trackByFn(index: any, item: TweetModel) {
    return item.tweetId;
  }


  sortedList() {
    return this.tweets.sort(
      (a, b) => (a.createdAt < b.createdAt) ? 1 : (a.createdAt == b.createdAt) ? 0 : -1);
  }

}
