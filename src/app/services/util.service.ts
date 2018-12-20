import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  stripExtension(s) {
    const pos = s.lastIndexOf('.');
    if (pos === -1) {
      return s;
    }
    return s.substr(0, pos);
  }
}
