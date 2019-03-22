import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternetService {

  constructor() { }

  openGoogle(q) {
    window.open(environment.googleUrl + q);
  }

  openImdbName(q) {
    window.open(environment.imdbNameUrl + q);
  }

}
