import { Pipe, PipeTransform } from '@angular/core';
import {Person} from './classes/Person';

@Pipe({
  name: 'typedName'
  // pure: false
})
export class TypedNamePipe implements PipeTransform {

  transform(value: Person[], args?: any): any {
    // console.log(value);
    if (value && args && typeof args === 'string') {
      const arg = args.toLowerCase();
      return value.filter(person => person.Name.toLowerCase().indexOf(arg) !== -1);
    //   value.Name = value.Name + ' transformed';
    }
    return value;
  }

}
