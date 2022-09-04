import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {LogService} from "../service/log.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  registerForm: FormGroup;
  isFailed: boolean;
  isMatching: boolean = true;

  constructor(private formBuilder: FormBuilder, private logger: LogService) {

    this.isFailed = false;

    this.registerForm = formBuilder.group({
      userId: ['', [this.checkUsername, Validators.required ]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [this.checkEmail, Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.logger.log(this.registerForm.value);

    let value = this.registerForm.value;
    this.logger.log(value);

  }

  createCompareValidator() {
    this.isMatching = this.registerForm.get("password")?.value === this.registerForm.get("confirmPassword")?.value;
  }


  checkUsername(control: AbstractControl) : ValidationErrors | null{
    let value = control.value;
    return (value.length == 0 || value !== 'Ankur')?  null : {'userAlreadyExist': true};
  }

  checkEmail(control: AbstractControl) : ValidationErrors | null{
    let value = control.value;
    return (value.length == 0 || value !== 'Ankur@gmail.com')?  null : {'emailAlreadyExist': true};
  }

}
