import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  requestUrl = environment.systemServer;

  constructor(
    private http: HttpClient,
  ) { }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  wikiInfo(q, lng) {
    return this.postForm('/wiki/' + lng, {q});
  }

}
