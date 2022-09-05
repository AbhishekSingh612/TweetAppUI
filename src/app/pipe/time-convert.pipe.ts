import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {

  constructor() {
  }

  response = [
    'Just now',
    'min ago',
    'hr ago',
    'd ago',
    'M ago',
    'yr ago'
  ]

  transform(value: any): string {

    if (value == undefined) {
      return '';
    }

    let time = new Date().getTime();
    let valueTime = new Date(value).getTime();

    let diffseconds = Math.floor((time - valueTime) / 1000);
    if (diffseconds < 60) return this.response[0];

    let diffMin = Math.floor(diffseconds / 60);
    if (diffMin < 60) return diffMin + this.response[1];

    let diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return diffHour + this.response[2];

    let diffDays = Math.floor(diffHour / 24);
    if (diffDays < 30) return diffDays + this.response[3];


    let diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return diffMonths + this.response[4];

    let diffYears = Math.floor(diffMonths / 12);
    return diffYears + this.response[5];
  }

}
