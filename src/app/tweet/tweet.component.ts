import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";
import {ApiService} from "../service/api.service";
import {TweetModel} from "../model/tweet.model";
import {UserModel} from "../model/user.model";

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet?: TweetModel;
  isCurrentUserTweet?: boolean;
  @Input() user?: UserModel;
  commentForm: FormGroup;
  isCommentVisible: boolean = false;
  isLiked: boolean = false;
  isHidden: boolean = false;

  constructor(private formBuilder: FormBuilder, private logger: LogService, private apiService: ApiService) {
    this.commentForm = formBuilder.group({
      comment: ['', [Validators.maxLength(144)]]
    });
  }

  ngOnInit(): void {
    this.isCurrentUserTweet = this.user?.userId === this.tweet?.author?.userId || this.user?.email === this.tweet?.author?.email;
    this.checkLike();
  }

  onComment() {
    this.logger.log(this.commentForm.value);
  }

  toggleComments() {
    this.isCommentVisible = !this.isCommentVisible;
  }

  toggleLike() {
    this.apiService.likeTweet(this.tweet?.tweetId, this.user?.userId)
      .subscribe((success) => {
          this.tweet = success;
          this.checkLike();
        },
        (error) => {
          this.logger.log(error)
        })
  }

  private checkLike() {
    if (this.user != null && this.tweet?.likedBy.includes(this.user.userId)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  }

  hideTweet() {
    this.isHidden = true;
  }
}
