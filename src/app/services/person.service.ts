import { Injectable } from '@angular/core';

@Injectable()
export class PersonService {

  constructor() { }

  hightlightMatch(name, query) {
    if (query) {
      name = name.replace(' ', '&nbsp;');
      return name.replace(query, '<b>' + query + '</b>');
    }
    return name;
  }

}
