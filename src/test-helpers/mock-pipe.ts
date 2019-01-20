import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'startwith'})
export class MockPipe implements PipeTransform {
  transform(value: any, ...args): any {
    return value;
  }
}
