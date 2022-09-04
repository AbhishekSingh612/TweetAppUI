import {Component, OnInit} from '@angular/core';
import {TweetModel} from "../model/tweet.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  tweetData: TweetModel;

  constructor() {

    this.tweetData = {
      author: {
        userId: "llankurll",
        firstName: "Abhishek",
        lastName: "Singh",
        email: "ankur@gmail.com",
        contactNumber: "8171212908"
      },
      content: "This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to.",
      createdAt: new Date(),
      likedBy:["user1", "user2", "user3", "user4"],
      replies: [
        {
          id: "replyid002",
          user: {
            userId: "supperMan.Cr007",
            firstName: "Ankur",
            lastName: "Singh",
            email: "ankur12@gmail.com",
            contactNumber: "8271212908"
          },
          comment: "Nice tweet",
          tag: "",
          createdAt: new Date()
        }
      ],
      tag: "",
      tweetId: "001"
    }

  }

  ngOnInit(): void {
  }

}
