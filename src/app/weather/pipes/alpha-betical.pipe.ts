import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'alphabetic'
})
export class AlphabeticPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return value.replace(/[^a-z-A-Z ]/g, '');
  }

}
