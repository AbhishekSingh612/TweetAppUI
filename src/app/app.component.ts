import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import {ApiService} from "./service/api.service";
import {UserModel} from "./model/user.model";
import {LogService} from "./service/log.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TweetApp';
  searchForm: FormGroup;
  userList: UserModel[] = [];

  isUserLoggedIn :boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private apiService: ApiService, private logger: LogService) {

    this.searchForm = formBuilder.group({
      value: ['']
    });

  }

  ngOnInit(): void {

    this.authService.isUserLogged$.subscribe(isLogged=>this.isUserLoggedIn=isLogged);

    this.searchForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(value => !!value),
        switchMap((value) => this.apiService.searchUsers(value.value)
          .pipe(catchError(() => {
            return []
          }))
        ))
      .subscribe(autocompleteList => {
        this.logger.log(autocompleteList);
        this.userList = autocompleteList.users;
      });

  }

  logout() {
    this.authService.logout();
  }

}
