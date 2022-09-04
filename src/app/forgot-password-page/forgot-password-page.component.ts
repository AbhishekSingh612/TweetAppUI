import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isMatching: boolean = true;

  constructor(private formBuilder: FormBuilder, private logger: LogService) {

    this.forgotPasswordForm = formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.logger.log(this.forgotPasswordForm.value);

    let value = this.forgotPasswordForm.value;
    this.logger.log(value);

  }

  createCompareValidator() {
    this.isMatching = this.forgotPasswordForm.get("password")?.value=== this.forgotPasswordForm.get("confirmPassword")?.value;
  }

}
