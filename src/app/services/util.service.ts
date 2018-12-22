import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  // isEmpty(obj) {
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  stripExtension(s) {
    const pos = s.lastIndexOf('.');
    if (pos === -1) {
      return s;
    }
    return s.substr(0, pos);
  }

  getById(arr, id, idFieldname) {
    // console.log(arr, id, idFieldname);
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

  concat(s, t) {
    if (s.length > 0 && t.length > 0) {
      s += ';';
    }
    // console.log(s + t);
    return s + t;
  }

  makeItemTitlepart(title: string, id: number, fieldname: string,
                    items: any[]): void {
    if (id !== -1) {
      const item = this.getById(
        items,
        id,
        'ID');
      if (item) {
        return item[fieldname];
      } else {
        console.log('no item has ID: ' + id);
      }
    }
    return '';
  }

  makeTitle(items) {
    const title = '';
    items.forEach(item => {
      title = this.concat(
        title, this.makeItemTitlepart(title, item.id,
          item.fieldname, item.items));
    });
    return title;

  }


}
