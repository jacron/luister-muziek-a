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

  fromShortYear(year) {
    if (year && year.length === 2) {
      return '19' + year;
    } else {
      return year;
    }
  }

}
