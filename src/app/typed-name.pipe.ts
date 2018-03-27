import { Pipe, PipeTransform } from '@angular/core';
import {Person} from './classes/Person';

@Pipe({
  name: 'typedName'
})
export class TypedNamePipe implements PipeTransform {

  transform(value: Person[], args?: any): any {
    if (value && args && typeof args === 'string') {
      const arg = args.toLowerCase();
      return value.filter(person => person.Name.toLowerCase().indexOf(arg) !== -1);
    }
    return value;
  }

}
