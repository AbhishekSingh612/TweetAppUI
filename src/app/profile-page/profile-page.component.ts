import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private router : Router) {
    console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  ngOnInit(): void {
  }

}
