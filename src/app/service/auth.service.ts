import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {shareReplay, tap} from "rxjs/operators";
import {LogService} from "./log.service";
import {JwtTokenResponseModel} from "../model/JwtTokenResponse.model";
import {UserModel} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username:string | undefined;

  constructor(private apiService : ApiService, private logger : LogService) {

  }

  login(username:string , password:string){
      return this.apiService.login(username, password)
        .pipe(tap(response => {
          return this.setSession(response);
        }), shareReplay(1));
  }

  private setSession(response: JwtTokenResponseModel) {
    this.logger.log("Setting token as : "+response.token);
    localStorage.setItem('token', response.token);
    localStorage.setItem("expiryDateMs", String(response.expiryDateMs));
    localStorage.setItem("username",String( response.user));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDateMs");
    localStorage.removeItem("username");
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
    return String(localStorage.getItem("username"));
  }

}
