import { Pipe, PipeTransform } from '@angular/core';
import {Person} from '../classes/Person';

@Pipe({
  name: 'startwith'
})
export class StartletterPipe implements PipeTransform {

  transform(items: Person[], filterBy: string): any {
    if (!items) {
      return items;
    }
    if (!filterBy || filterBy.length === 0) {
      return items;
    }
    filterBy = filterBy.toUpperCase();
    // console.log(items);
    return items.filter(
      item => item.LastName.startsWith(filterBy)
    );
  }

}
