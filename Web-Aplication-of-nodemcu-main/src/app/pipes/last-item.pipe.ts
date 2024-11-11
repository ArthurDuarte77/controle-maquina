import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastItem'
})
export class LastItemPipe implements PipeTransform {

  transform(value: string) {
    
  }

}
