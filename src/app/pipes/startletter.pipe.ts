import { Pipe, PipeTransform } from '@angular/core';
import {Person} from '../classes/music/Person';

@Pipe({
  name: 'startwith'
})
export class StartletterPipe implements PipeTransform {

  transform(items: Person[], filterBy: string, fieldName: string): any {
    if (!items) {
      return items;
    }
    if (!filterBy || filterBy.length === 0) {
      return items;
    }
    filterBy = filterBy.toUpperCase();
    // console.log(items);
    console.log(fieldName);
    return items.filter(
      item => item[fieldName].startsWith(filterBy)
    );
  }

}
