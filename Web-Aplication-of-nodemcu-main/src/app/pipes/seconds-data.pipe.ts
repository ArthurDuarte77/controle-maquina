import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsData'
})
export class SecondsDataPipe implements PipeTransform {

  transform(value: number) {
    console.log(value / 60)
    let minutes = Math.floor(value / 60);
    let hours = Math.floor(minutes / 60) % 24;
    let days = Math.floor(value / (60 * 60 * 24));
    minutes %= 60;
    return `${days}d ${hours}h ${minutes}m`;
  }

}
