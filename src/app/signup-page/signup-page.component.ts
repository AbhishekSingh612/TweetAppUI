import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";
import {ApiService} from "../service/api.service";
import {RegisterUserModel} from "../model/register-user.model";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  registerForm: FormGroup;
  isFailed: boolean;
  isSuccess: boolean;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder, private logger: LogService, private apiService: ApiService) {

    logger.log("Constructor called")

    this.isFailed = false;
    this.isSuccess = false;
    this.isLoading = false;

    this.registerForm = formBuilder.group({
      userId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    }, {validators: this.passwordMatchValidator});
  }

  ngOnInit(): void {
    this.isFailed = false;
    this.isSuccess = false;

  }

  onSubmit() {
    let value = this.registerForm.value;
    this.logger.log(value);
    let registerRequest: RegisterUserModel = {
      userId: value.userId,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      contactNumber: value.contactNumber,
      password: value.password,
      confirmPassword: value.confirmPassword
    }

    this.isLoading = true;
    this.apiService.register(registerRequest)
      .subscribe((success) => {
          this.isLoading = false;
          this.logger.log(success);
          this.logger.log("successfully registered");
          this.isSuccess = true;
          this.resetForm();
        },
        (error) => {
          this.isLoading = false;
          this.logger.log(error);
          this.logger.log("error occured while registered");
          this.isFailed = true;
        });

  }

  checkEmail(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    return (value.length == 0 || value !== 'Ankur@gmail.com') ? null : {'emailAlreadyExist': true};
  }

/*  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.apiService.searchUsers(control.value).pipe(map(res => {
        return res ? {'userAlreadyExist': true} : null;
      }))
    }
  }*/


  validateUsername() {
    let control = this.registerForm.controls['userId'];
    if (control.value.length != 0) {
      this.apiService.getUserDetails(control.value).subscribe(
        data => {
          this.logger.log(data);
          (data) ? control.setErrors({'userAlreadyExist': true}) : control.setErrors(null);
        }, () => control.setErrors(null));
    } else
      control.setErrors({'required': true});
  }

  validateEmail() {
    let control = this.registerForm.controls['email'];
    if (control.value.length != 0) {
      this.apiService.getUserDetailsWithEmail(control.value).subscribe(
        data => {
          this.logger.log(data);
          (data) ? control.setErrors({'emailAlreadyExist': true}) : control.setErrors(null);
        }, () => control.setErrors(null));
    } else
      control.setErrors({'required': true});
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    let isMatching = password?.value === confirmPassword?.value;

    if (!isMatching)
      return {'passwordMismatch': true};

    return null;
  }

  resetForm() {
    this.registerForm.reset({
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      contactNumber: ''
    });
  }


}
