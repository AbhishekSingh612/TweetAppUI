import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {shareReplay, tap} from "rxjs/operators";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService : ApiService, private logger : LogService) { }

  login(username:string , password:string){
      return this.apiService.login(username, password)
        .pipe(tap(response => {
          return this.setSession(response);
        }), shareReplay(1));
  }

  private setSession(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem("expiryDateMs", String(response.expiryDateMs));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDateMs");
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
}
