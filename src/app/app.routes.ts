import {Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";

export const appRoutes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', component: ErrorComponent }
];
