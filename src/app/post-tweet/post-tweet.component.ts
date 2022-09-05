import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {ApiService} from "../service/api.service";
import {LogService} from "../service/log.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../service/common.service";

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  @Input() user?: UserModel;
  postTweetForm: FormGroup;

  constructor(private apiService: ApiService, private logger: LogService, private formbuilder: FormBuilder, private common: CommonService) {

    this.postTweetForm = formbuilder.group({
      content: ['', [Validators.maxLength(144), Validators.required]]
    });

  }

  ngOnInit(): void {

  }

  onPost() {
    this.common.postTweet(this.postTweetForm.controls['content'].value, null, this.user?.userId);
    this.postTweetForm.reset();
  }

}
