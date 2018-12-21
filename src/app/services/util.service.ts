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

  getById(arr, id, idFieldname) {
    // console.log(arr, +id, idFieldname);
    if (!arr) {
      return null;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][idFieldname] === +id) {
        return arr[i];
      }
    }
    return null;
  }
}
