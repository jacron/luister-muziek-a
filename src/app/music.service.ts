import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const requestUrl = 'http://127.0.0.1:8010/ajax/';

@Injectable()
export class MusicService {

  constructor(private http: HttpClient) { }

  refetch(id) {
    const params = new HttpParams()
      .set('cmd', 'refetch')
      .set('albumid', id)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      requestUrl, params, { headers: headers}
    );
  }

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

  editCue(id, albumid) {
    const params = new HttpParams()
      .set('cmd', 'editcuesheet')
      .set('id', id)
      .set('albumid', albumid)
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

  updateAlbumTitle(id, title) {
    const params = new HttpParams()
      .set('cmd', 'update_album_title')
      .set('albumid', id)
      .set('title', title);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(requestUrl, params, {
      headers: headers
    });
  }

  getSearchedAlbums(params) {
    const idcomp = params.idcomp === -1 ? null : params.idcomp.toString(),
      idperf = params.idperf === -1 ? null : params.idperf.toString(),
      idcoll = params.idcoll === -1 ? null : params.idcoll.toString(),
      idtag = params.idtag === -1 ? null : params.idtag.toString();
    const cql = {
      componist: idcomp,
      performer: idperf,
      mother: idcoll,
      tag: idtag
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
      .set('cmd', 'collections')
      .set('selection', selection)
    ;
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  getTags(selection) {
    const params = new HttpParams()
      .set('cmd', 'tags')
      .set('selection', selection)
    ;
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  controlPlayer(cmd) {
    const params = new HttpParams()
      .set('cmd', 'controlplayer')
      .set('mode', cmd)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      requestUrl, params, { headers: headers}
    );
  }

  tagEditor(path) {
    const params = new HttpParams()
      .set('cmd', 'tageditor')
      .set('path', path)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      requestUrl, params, { headers: headers}
    );
  }

  getComposerById(id: number) {
    const params = new HttpParams()
      .set('cmd', 'composer_by_id')
      .set('id', id.toString())
    ;
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});

  }

  getPerformerById(id: number) {
    const params = new HttpParams()
      .set('cmd', 'performer_by_id')
      .set('id', id.toString())
    ;
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});

  }

  // getDiscidInfo(discid: string) {
  //   const params = new HttpParams()
  //     .set('discid', discid)
  //     .set('page', '1')
  //   ;
  //   const request_url = 'http://www.freedb.org/freedb_discid_check.php';
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'text/html');
  //   headers.append('Accept', 'text/html');
  //   return this.http.get(request_url, {
  //     responseType: 'text',
  //     params});
  // }
}
