import {Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {SignupPageComponent} from "./signup-page/signup-page.component";
import {ForgotPasswordPageComponent} from "./forgot-password-page/forgot-password-page.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {AuthGuardService} from "./service/auth-guard.service";

export const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent ,canActivate : [AuthGuardService]},
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LoginPageComponent ,canActivate : [AuthGuardService]},
  { path: 'register', component: SignupPageComponent },
  { path: 'profile/:id', component: ProfilePageComponent ,canActivate : [AuthGuardService]},
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: ErrorPageComponent }
];
