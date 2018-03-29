import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const requestUrl = 'http://127.0.0.1:8010/ajax/';

@Injectable()
export class MusicService {

  constructor(private http: HttpClient) { }

  openFinder(id) {
    const params = new HttpParams()
      .set('cmd', 'openfinder')
      .set('objectid', id)
      .set('kind', 'album')
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      requestUrl, params, { headers: headers}
    );
  }

  play(id) {
    const params = new HttpParams()
      .set('cmd', 'play')
      .set('arg', id)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      requestUrl, params, { headers: headers}
    );
  }
  getAlbumByPath(path) {
    const params = new HttpParams()
      .set('cmd', 'album_by_path')
      .set('path', path);
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  getAlbumById(id) {
    const params = new HttpParams()
      .set('cmd', 'album_by_id')
      .set('id', id);
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  // updateAlbumTitle(id, title) {
  //   const params = new HttpParams()
  //     .set('cmd', 'update_album_title')
  //     .set('albumid', id)
  //     .set('title', title);
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(requestUrl, params, {
  //     headers: headers
  //   });
  // }

  getAlbumAlbums(albumId) {
    const params = new HttpParams()
      .set('cmd', 'album_albums')
      .set('albumId', albumId);
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  getSearchedAlbums(params) {
    const idcomp = +params.idcomp === -1 ? null : params.idcomp,
      idperf = +params.idperf === -1 ? null : params.idperf,
      idcoll = +params.idcoll === -1 ? null : params.idcoll;
    const cql = {
      componist: idcomp,
      performer: idperf,
      mother: idcoll
    };
    const httpParams = new HttpParams()
      .set('cmd', 'cql_search')
      .set('cql', JSON.stringify(cql));
    return this.http.get(requestUrl, {
      responseType: 'json',
      params: httpParams});
  }

  getComposers(selection) {
    const params = new HttpParams()
      .set('cmd', 'componisten')
      .set('selection', selection)
      .set('format', '%Last, %First');
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  getPerformers(selection) {
    const params = new HttpParams()
      .set('cmd', 'performers')
      .set('selection', JSON.stringify(selection))
      .set('format', '%Last, %First');
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  getCollections(selection) {
    const params = new HttpParams()
      .set('selection', selection)
      .set('cmd', 'collections');
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }
}
