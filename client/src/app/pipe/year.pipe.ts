import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formattedYear'
})
export class YearPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return 1900 + value * 1;
  }

}
