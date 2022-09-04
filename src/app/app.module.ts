import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignupPageComponent} from './signup-page/signup-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TweetComponent } from './tweet/tweet.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import {AuthInterceptorService} from "./service/auth-interceptor.service";
import { TimeConvertPipe } from './time-convert.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    ForgotPasswordPageComponent,
    ErrorPageComponent,
    TweetComponent,
    HomePageComponent,
    PostTweetComponent,
    TimeConvertPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
