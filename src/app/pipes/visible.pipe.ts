import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visible'
})
export class VisiblePipe implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items) {
      return items;
    }
    return items.filter(
      item => item.visible
    );
  }

}
