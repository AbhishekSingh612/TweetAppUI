import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  isLoading: boolean = false;
  isUsernameInvalid: boolean = false;

  constructor(private formBuilder: FormBuilder,private apiService: ApiService, private logger: LogService) {
    this.isLoading = false;

    this.forgotPasswordForm = formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validators: this.passwordMatchValidator});

  }

  ngOnInit(): void {
    this.isFailed = false;
    this.isSuccess = false;
    this.isLoading = false;
    this.isUsernameInvalid = false;
  }

  onSubmit() {
    let value = this.forgotPasswordForm.value;
    this.isLoading = true;
    this.apiService.forgotPassword(value.userId, value.password)
      .subscribe((success)=>{
        this.isLoading = false;
        this.logger.log("Successfully registered!");
        this.logger.log(success);
        this.isSuccess = true;
        this.resetForm();
      },(error)=>{
        this.isLoading = false;
        this.logger.log("Error occurred while registering user");
        this.logger.log(error);

        (error.status==404)? this.isUsernameInvalid = true : this.isFailed = true;
      })


    this.logger.log(value);

  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    let isMatching = password?.value === confirmPassword?.value;

    if (!isMatching)
      return {'passwordMismatch': true};

    return null;
  }

  resetForm(){
    this.forgotPasswordForm.reset();
  }


}
