import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {shareReplay, tap} from "rxjs/operators";
import {LogService} from "./log.service";
import {RegisterUserModel} from "../model/register-user.model";
import {UserListModel} from "../model/users.model";
import {JwtTokenResponseModel} from "../model/JwtTokenResponse.model";
import {TweetModel} from "../model/tweet.model";


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
    return this.http.get<UserListModel>(this.BASE_URL + "user/search/" + username)
      .pipe(shareReplay());
  }

  postTweet(content: string, tag: string | null, username: string | undefined): Observable<TweetModel> {
    return this.http.post<TweetModel>(this.BASE_URL + username + "/add", {content: content, tag: tag});
  }

  updateTweet(id: string, content: string, tag: string | null, username: string): Observable<TweetModel> {
    return this.http.put<TweetModel>(this.BASE_URL + username + "/update/" + id, {content: content, tag: tag});
  }

  deleteTweet(id: string, username: string): Observable<any> {
    return this.http.delete(this.BASE_URL + username + "/delete/" + id, {responseType: 'text'});
  }

  likeTweet(id: string | undefined, username: string | undefined): Observable<TweetModel> {
    return this.http.put<TweetModel>(this.BASE_URL + username + "/like/" + id, {});
  }

  replyTweet(id: string, username: string, reply: string, tag: string): Observable<TweetModel> {
    return this.http.post<TweetModel>(this.BASE_URL + username + "/reply/" + id, {reply: reply, tag: tag});
  }

  getAllTweets(): Observable<TweetModel[]> {
    return this.http.get<TweetModel[]>(this.BASE_URL + "all");
  }

  getAllUserTweets(username: string): Observable<TweetModel[]> {
    return this.http.get<TweetModel[]>(this.BASE_URL + username);
  }

}
