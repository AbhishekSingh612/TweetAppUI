import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {shareReplay, tap} from "rxjs/operators";
import {LogService} from "./log.service";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL: string = "http://localhost:8080/api/v1.0/tweets/";

  constructor(private http: HttpClient,private logger : LogService) {
  }

  login(username: string, password: string): Observable<any> {
    let params = new HttpParams().set("username", username).set("password", password);
    return this.http.get(this.BASE_URL + "login", {params: params});
  }



}
