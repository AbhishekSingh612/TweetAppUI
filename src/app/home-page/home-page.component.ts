import {Component, OnInit} from '@angular/core';
import {TweetModel} from "../model/tweet.model";
import {LogService} from "../service/log.service";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
import {UserModel} from "../model/user.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  tweetDataList: TweetModel[];
  user: UserModel | undefined;

  constructor(private logger: LogService, private apiService: ApiService, private authService: AuthService) {
    this.tweetDataList = [];
  }

  ngOnInit(): void {

    this.apiService.searchUsers(this.authService.getUsername())
      .subscribe((user) => {
          this.user = user.users[0]
        },
        (error) => {
          this.logger.log(error)
        });

    this.apiService.getAllTweets()
      .subscribe(
        (success) => {
          this.logger.log(success)
          this.tweetDataList = success;
        }, (error) => {
          this.logger.log(error)
        })

  }

}
