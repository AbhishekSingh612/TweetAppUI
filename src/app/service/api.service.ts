import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {shareReplay} from "rxjs/operators";
import {LogService} from "./log.service";
import {RegisterUserModel} from "../model/register-user.model";
import {UserListModel} from "../model/users.model";
import {JwtTokenResponseModel} from "../model/JwtTokenResponse.model";
import {TweetModel} from "../model/tweet.model";
import {UserModel} from "../model/user.model";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL: string = "http://localhost:8080/api/v1.0/tweets/";

  constructor(private http: HttpClient, private logger: LogService) {
  }

  login(username: string, password: string): Observable<JwtTokenResponseModel> {
    let params = new HttpParams().set("username", username).set("password", password);
    return this.http.get<JwtTokenResponseModel>(this.BASE_URL + "login", {params: params});
  }

  forgotPassword(username: string, password: string): Observable<any> {
    let params = new HttpParams().set("password", password);
    return this.http.get(this.BASE_URL + username + "/forgot", {params: params, responseType: 'text'});
  }

  register(registerRequest: RegisterUserModel): Observable<any> {
    return this.http.post(this.BASE_URL + "register", registerRequest, {
      responseType: 'text'
    });
  }

  getAllUsers(): Observable<UserListModel> {
    return this.http.get<UserListModel>(this.BASE_URL + "users");
  }

  searchUsers(username: string | undefined): Observable<UserListModel> {

    if (username == null || username.length==0)
      return of({users: []});

    this.logger.log(username);
    return this.http.get<UserListModel>(this.BASE_URL + "user/search/" + username)
      .pipe(shareReplay());
  }

  postTweet(content: string, tag: string | null, username: string | undefined): Observable<TweetModel> {
    return this.http.post<TweetModel>(this.BASE_URL + username + "/add", {content: content, tag: tag});
  }

  updateTweet(id: string | undefined, content: string, tag: string | null, username: string | undefined): Observable<TweetModel> {
    return this.http.put<TweetModel>(this.BASE_URL + username + "/update/" + id, {content: content, tag: tag});
  }

  deleteTweet(id: string, username: string): Observable<any> {
    return this.http.delete(this.BASE_URL + username + "/delete/" + id, {responseType: 'text'});
  }

  likeTweet(id: string | undefined, username: string | undefined): Observable<TweetModel> {
    return this.http.put<TweetModel>(this.BASE_URL + username + "/like/" + id, {});
  }

  replyTweet(id: string | undefined, username: string | undefined, reply: string, tag: any): Observable<TweetModel> {
    return this.http.post<TweetModel>(this.BASE_URL + username + "/reply/" + id, {reply: reply, tag: tag});
  }

  getAllTweets(): Observable<TweetModel[]> {
    return this.http.get<TweetModel[]>(this.BASE_URL + "all");
  }

  getAllUserTweets(username: string): Observable<TweetModel[]> {
    return this.http.get<TweetModel[]>(this.BASE_URL + username).pipe(shareReplay());
  }

  getCurrentUserDetails(){
    return this.http.get<UserModel>(this.BASE_URL + "user/currentUserDetail")
      .pipe(shareReplay());
  }

  getUserDetails(userid: String){
    return this.http.get<UserModel>(this.BASE_URL + "user/find/"+userid)
      .pipe(shareReplay());
  }

  getUserDetailsWithEmail(email: String){
    return this.http.get<UserModel>(this.BASE_URL + "user/findEmail/"+email)
      .pipe(shareReplay());
  }
}
