import { Injectable } from '@angular/core';
import {FormOption} from '../../../../classes/shared/FormOption';
import {Validators} from '@angular/forms';

const formOptions: FormOption[] = [
  {
    name: 'first',
    label: 'Voornaam',
  },
  {
    name: 'last',
    validators: [Validators.required],
    label: 'Achternaam',
  },
  {
    name: 'born',
    label: 'Geboren',
  },
  {
    name: 'died',
    label: 'Overleden',
  },
  {
    name:'country',
    label: 'Land'
  },
  {
    name: 'genre',
    label: 'Genre',
  },
];

@Injectable({
  providedIn: 'root'
})
export class AuthorEditCardService {
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

  getFormOptions() {
    return formOptions;
  }

}
