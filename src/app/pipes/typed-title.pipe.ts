import { Pipe, PipeTransform } from '@angular/core';
import {Album} from '../classes/Album';

@Pipe({
  name: 'typedTitle'
})
export class TypedTitlePipe implements PipeTransform {

  transform(value: Album[], args?: any): any {
    if (value && args && typeof args === 'string') {
      const arg = args.toLowerCase();
      return value.filter(album => album.Title.toLowerCase().indexOf(arg) !== -1);
    }
    return value;
  }

}
