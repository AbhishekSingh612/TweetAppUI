import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";
import {ApiService} from "../service/api.service";
import {TweetModel} from "../model/tweet.model";
import {UserModel} from "../model/user.model";
import {CommonService} from "../service/common.service";

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet?: TweetModel;
  isCurrentUserTweet?: boolean;
  user?: UserModel;
  commentForm: FormGroup;
  isCommentVisible: boolean = false;
  isLiked: boolean = true;
  isHidden: boolean = false;
  updateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private logger: LogService, private apiService: ApiService, private common: CommonService) {
    this.commentForm = formBuilder.group({
      comment: ['', [Validators.maxLength(144), Validators.required]]
    });

    this.updateForm = formBuilder.group({
      content: ['', [Validators.maxLength(144), Validators.required]]
    });
  }

  ngOnInit(): void {

    this.apiService.getCurrentUserDetails()
      .subscribe((user) => {
          this.user = user;
          this.checkLike();
          this.isCurrentUserTweetComponent();
        },
        (error) => {
          this.logger.log(error)
        });


    this.updateForm = this.formBuilder.group({
      content: [this.tweet?.content, [Validators.maxLength(144)]]
    });


  }

  private isCurrentUserTweetComponent() {
    this.isCurrentUserTweet = this.user?.userId === this.tweet?.author?.userId || this.user?.email === this.tweet?.author?.email;
  }

  onComment() {
    this.logger.log(this.commentForm.value);
    this.apiService.replyTweet(this.tweet?.tweetId, this.user?.userId, this.commentForm.controls['comment'].value, null)
      .subscribe((tweet) => {
        if (this.tweet != null) {
          this.tweet.replies = tweet.replies;
          this.common.replyTweet(this.tweet);
        }
        this.commentForm.reset({content: ""});
      }, error => this.logger.log(error));
  }

  toggleComments() {
    this.isCommentVisible = !this.isCommentVisible;
  }

  toggleLike() {
    this.apiService.likeTweet(this.tweet?.tweetId, this.user?.userId)
      .subscribe((success) => {
          this.tweet = success;
          this.common.toggleLike(this.tweet, this.user?.userId);
          this.checkLike();
        },
        (error) => {
          this.logger.log(error)
        })

  }

  private checkLike() {
    this.logger.log({'user': this.user, 'likes': this.tweet?.likedBy})
    this.isLiked = this.user != null && this.tweet != null && this.tweet.likedBy != null && this.tweet.likedBy.includes(this.user.userId);//todo fix for null likedBy
  }

  hideTweet() {
    this.isHidden = true;
  }

  onDelete() {
    this.common.deleteTweet(this.tweet?.tweetId, this.user?.userId);
  }

  onUpdate() {
    this.common.updateTweet(this.tweet?.tweetId, this.updateForm.controls['content'].value, null, this.user?.userId);
  }
}
