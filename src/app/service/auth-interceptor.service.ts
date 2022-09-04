import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogService} from "./log.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private logger: LogService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("token");

    this.logger.log("Adding header : "+idToken);

    if (idToken) {
      const cloned = req.clone({headers: req.headers.set("Authorization", "Bearer " + idToken)});

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
