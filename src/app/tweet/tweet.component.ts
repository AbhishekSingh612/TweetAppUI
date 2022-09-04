import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";
import {AuthService} from "../service/auth.service";
import {ApiService} from "../service/api.service";
import {TweetModel} from "../model/tweet.model";

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet?: TweetModel;
  commentForm: FormGroup;
  isCommentVisible: boolean = false;
  isLiked: boolean = false;

  constructor(private formBuilder: FormBuilder, private logger: LogService, private apiService: ApiService) {
    this.commentForm = formBuilder.group({
      comment: ['', [Validators.maxLength(144)]]
    });
  }

  ngOnInit(): void {


  }

  onComment() {
    this.logger.log(this.commentForm.value);
  }

  toggleComments() {
    this.isCommentVisible = !this.isCommentVisible;
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.tweet?.likedBy.push("username");
    }
    else {
      this.tweet?.likedBy.pop();
    }
  }

}
