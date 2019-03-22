import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {FormOption} from '../classes/shared/FormOption';

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
      case 'r':
        return 'Rusland';
      case 'i':
        return 'Italie';
      case 's':
        return 'Spanje';
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

  jaartalValid(value) {
    // een jaartal mag uit geen, twee of vier cijfers bestaan
    // een jaartal mag ook null of undefined zijn
    return /^(\d{2})$/.test(value) ||
           /^(\d{4})$/.test(value) ||
           /^$/.test(value) ||
          !value;
  }

  jaartalValidator():ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = this.jaartalValid(control.value);
      return valid ? null : {'jaartal': {value: control.value}};
    }
  }

  initForm(options: FormOption[], person) {
    const controls = {};
    options.forEach(option => {
      controls[option.name] = new FormControl({
        value: person[option.name],
        disabled: false
      }, option.validators);
    });
    return new FormGroup(controls);
  }

}
