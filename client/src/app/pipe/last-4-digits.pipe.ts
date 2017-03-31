import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'last4Digits'
})
export class Last4DigitsPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    console.log(value);
    return value % 10000;
  }

}
