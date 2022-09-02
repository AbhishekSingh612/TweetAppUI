import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isFailed: boolean;

  constructor(private formBuilder: FormBuilder, private logger: LogService, private authService: AuthService) {

    this.isFailed = false;

    this.loginForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.logger.log(this.loginForm.value);

    let value = this.loginForm.value;
    this.authService.login(value.username, value.password)
      .subscribe(
        (token) => {
          this.logger.log(token);
          this.isFailed = false;
        },
        () => {
          this.logger.log("error in login");
          this.isFailed = true;
        });

  }

  checkLogin() {
    this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
