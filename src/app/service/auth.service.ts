import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {shareReplay, tap} from "rxjs/operators";
import {LogService} from "./log.service";
import {JwtTokenResponseModel} from "../model/JwtTokenResponse.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username:string | undefined;

  isUserLogged$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService : ApiService, private logger : LogService) {
    this.isUserLogged$.next(this.isLoggedIn());
  }

  login(username:string , password:string){
      return this.apiService.login(username, password)
        .pipe(tap(response => {
          return this.setSession(response);
        }), shareReplay(1));
  }

  private setSession(response: JwtTokenResponseModel) {
    this.logger.log("Setting token response : "+response);
    localStorage.setItem('token', response.token);
    localStorage.setItem("expiryDateMs", String(response.expiryDateMs));
    localStorage.setItem("username",String( response.user));
    this.isUserLogged$.next(this.isLoggedIn());
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDateMs");
    localStorage.removeItem("username");
    this.isUserLogged$.next(this.isLoggedIn());
  }

  public isLoggedIn() {
    let isLoggedId = new Date().getTime()<this.getExpiration();
    this.logger.log({"Current time" : new Date().getTime() , "Expiry Time" : this.getExpiration(), "isLoggedIn": isLoggedId})
    return isLoggedId;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() : number{
    return  Number(localStorage.getItem("expiryDateMs"));
  }

  getUsername(){
    let s = String(localStorage.getItem("username"));
    this.logger.log("user from local storage : "+s)
    return s;
  }

}
