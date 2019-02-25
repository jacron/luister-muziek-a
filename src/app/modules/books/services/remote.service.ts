import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {
  requestUrl = environment.scrapeServer;

  constructor(
    private http: HttpClient
  ) { }

  /* GET */
  private getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  getRemote(isbn, source) {
    const cmd = `/remote/${source}/${isbn}`;
    return this.getJson(cmd);
  }

}
