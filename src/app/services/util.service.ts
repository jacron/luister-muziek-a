import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  isArray(a) {
    return Array.isArray(a);
  }

  isEmpty(obj) {
    for (const key in obj) {
      // console.log(key);
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  isValidImdbTitleId(tt) {
    // e.g. tt0052520
    return tt.startsWith('tt') && tt.length === 9;
  }

  parseTitleUrl(url) {
    if (!url) { return url; }
    const parts = url.split('/');
    return parts.find(part => part.startsWith('tt'));
  }

  getExtension(s) {
    const pos = s.lastIndexOf('.');
    if (pos === -1) {
      return '';
    }
    return s.substr(pos);
  }

  stripExtension(s) {
    const pos = s.lastIndexOf('.');
    if (pos === -1) {
      return s;
    }
    return s.substr(0, pos);
  }

  getById(arr, id, idFieldname) {
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
    return s + t;
  }

  makeItemTitlepart(title: string, id: number, fieldname: string,
                    items: any[]): string {
    if (id !== -1) {
      const item = this.getById(
        items,
        id,
        'ID');
      if (item) {
        return item[fieldname];
      } else {
        // console.log('no item has ID: ' + id);
      }
    }
    return '';
  }

  makeTitle(items) {
    let title = '';
    items.forEach(item => {
      title = this.concat(
        title, this.makeItemTitlepart(title, item.id,
          item.fieldname, item.items));
    });
    return title;

  }


}
