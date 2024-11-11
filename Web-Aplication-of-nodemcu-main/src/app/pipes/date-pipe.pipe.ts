import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursAndMinutes'
})
export class DatePipePipe implements PipeTransform {

  transform(value: number): string {
    let hours = Math.floor(value);
    let minutes = Math.round((value - hours) * 60);
    return hours + ' hora(s) e ' + minutes + ' minuto(s)';
  }

}
