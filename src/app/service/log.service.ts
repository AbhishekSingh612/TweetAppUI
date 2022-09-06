import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  canLog : boolean;

  constructor() {
    this.canLog = false;
  }

  log(content : any){
    if (this.canLog){
      console.log(content);
    }
  }
}
