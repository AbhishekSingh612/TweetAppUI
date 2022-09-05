import {Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {SignupPageComponent} from "./signup-page/signup-page.component";
import {ForgotPasswordPageComponent} from "./forgot-password-page/forgot-password-page.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";

export const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LoginPageComponent },
  { path: 'register', component: SignupPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];
