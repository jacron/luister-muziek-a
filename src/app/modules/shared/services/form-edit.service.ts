import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormEditService {

  constructor() { }

  fromShortCountry(country) {
    switch(country) {
      case 'nl':
        return 'Nederland';
      case 'gb':
        return 'Engeland';
      case 'u':
        return 'USA';
      case 'de':
        return 'Duitsland';
      case 'fr':
        return 'Frankrijk';
      default:
        return country;
    }
  }

  fromBornDied(pborn, pdied) {
    let born = pborn, died = pdied;
    // died: default is 19yy
    if (pdied && pdied.length === 2) {
      died = '19' + pdied;
    }
    // borne: default is 18xx when xx > yy
    if (pborn && pborn.length === 2) {
      if (pdied && pdied.length === 2 && pborn > pdied) {
        born = '18' + pborn;
      } else {
        born = '19' + pborn;
      }
    }
    // when born is 19yy and died.xx < yy, then use 20xx
    // ? older than 100??

    return {born, died};
  }

  fromShortYear(year) {
    if (year && year.length === 2) {
      return '19' + year;
    } else {
      return year;
    }
  }

}
