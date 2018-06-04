import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

// const requestUrl = 'http://127.0.0.1:8010/ajax/';

@Injectable()
export class MusicService {

  requestUrl = environment.apiServer;
  constructor(private http: HttpClient) { }

  /* GET */
  getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  getComposers() {
    return this.getJson('/composers');
  }

  getPerformers() {
    return this.getJson('/performers');
  }

  getCollections() {
    return this.getJson('/collections');
  }

  getTags() {
    return this.getJson('/tags');
  }

  getComposerById(id: number) {
    return this.getJson('/composers/' + id);
  }

  getPerformerById(id: number) {
    return this.getJson('/performers/' + id);
  }

  getAlbumById(id) {
    return this.getJson('/albums/' + id);
  }

  getInfos() {
    return this.getJson('/infos');
  }

  getCodes() {
    return this.getJson('/codes');
  }

  getCode(code) {
    return this.getJson('/codes/' + code + '/false');
  }

  getAlbumCountForTag(id) {
    return this.getJson('/tag/albums/count/' + id);
  }

  getAlbumCountForPerson(id, type) {
    return this.getJson('/person/albums/count/' + id);
  }

  getSearchedAlbums(params) {
    const search = 'zoek'; // todo: get search (title)
    const url = this.requestUrl + '/cql/' + search + '/' +
      params.idcomp + '/' + params.idperf + '/' + params.idcoll + '/' +
      params.idtag;
    return this.http.get(url, {
      responseType: 'json'});
  }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  postHeaders() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getAlbumByPath(path) {
    return this.postForm('/album/path', { path: path });
  }

  editCue(id, albumid) {
    return this.postForm('/edit/cuesheet', {id: id, albumid: albumid});
  }

  tagEditor(path) {
    return this.postForm('/tag/editor', { path: path});
    // console.log(path);
    // const params = new HttpParams()
    //   .set('cmd', 'tageditor')
    //   .set('path', this.encodeSemiColon(path))
    // ;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

  deleteCue(id, albumid) {
    return this.postForm('/delete/cueheet', {id: id, albumid: albumid});
  }

  openFinder(id) {
    const params = {objectid: id};
    // const params = new HttpParams()
    //   .set('objectid', id);
    return this.postForm('/finder/album', params);
  }

  addComposer(composerId: number, albumId: number) {
    return this.postForm('/composer/add',
      {composerId: composerId, albumId: albumId});
  }

  addPerformer(performerId: number, albumId: number) {
    return this.postForm('/performer/add',
      {performerId: performerId, albumId: albumId});
  }

  addTag(tagId: number, albumId: number) {
    return this.postForm('/tag/add',
      {tagId: tagId, albumId: albumId});
  }

  newPerformer(name, albumId) {
    return this.postForm('/performer/new', {
      albumid: albumId,
      name: name
    });
  }

  newComposer(name, albumId) {
    return this.postForm('/composer/new', {
      albumid: albumId,
      name: name
    });
  }

  removeComposer(composerId: number, albumId: number) {
    return this.postForm('/composer/remove', {
      composerId: composerId, albumId: albumId
    });
  }

  removePerformer(performerId: number, albumId: number) {
    return this.postForm('/performer/remove', {
      performerId: performerId, albumId: albumId
    });
  }

  removeTag(tagId: number, albumId: number) {
      return this.postForm('/tag/remove', {
        tagId: tagId, albumId: albumId
      });
  }

  refetch(id) {
    return this.postForm('/pieces/reload', {
      albumId: id
    });
  }

  updateCuesheetTitle(id, albumid, title) {
    return this.postForm('/cuesheet/update', {
      albumId: albumid,
      pieceId: id,
      title: title
    });
    // const params = new HttpParams()
    //   .set('cmd', 'update_cuesheet_title')
    //   .set('id', id)
    //   .set('albumid', albumid)
    //   .set('title', title);
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(this.requestUrl, params, {
    //   headers: headers
    // });
  }

  updateLibraryCodeAlias(code, text) {
    const params = new HttpParams()
      .set('cmd', 'update_librarycode_alias')
      .set('code', code)
      .set('text', text)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  updateLibraryCodeTitle(code, text) {
    const params = new HttpParams()
      .set('cmd', 'update_librarycode_title')
      .set('code', code)
      .set('text', text)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  uploadAlbumByPath(path) {
    const params = new HttpParams()
      .set('cmd', 'upload')
      .set('path', this.encodeSemiColon(path));
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  updateAlbumMetatag(albumId, key, text) {
    const params = new HttpParams()
      .set('cmd', 'update_metatag')
      .set('tag', key)
      .set('value', text)
      .set('albumid', albumId)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  newTag(name, albumId) {
    const params = new HttpParams()
      .set('cmd', 'new_tag')
      .set('name', name)
      .set('albumid', albumId)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  pastePersonImage(personId, type) {
    const params = new HttpParams()
      .set('cmd', 'paste_person')
      .set('id', personId)
      .set('type', type)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.requestUrl, params, {
      headers: headers
    });
  }

  pasteFolder(albumid) {
    const params = new HttpParams()
      .set('cmd', 'paste_folder')
      .set('albumid', albumid)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  openwebsite(albumid) {
    const params = new HttpParams()
      .set('cmd', 'openwebsite')
      .set('albumid', albumid)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  nameCueFromFilename(id, albumid) {
    const params = new HttpParams()
      .set('cmd', 'cuesheet_title_from_filename')
      .set('id', id)
      .set('albumid', albumid)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  nameCueToFilename(id, albumid, title) {
    const params = new HttpParams()
      .set('cmd', 'cuesheet_title_to_filename')
      .set('id', id)
      .set('albumid', albumid)
      .set('title', title)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  makeCuesheet(cueName, ids, albumid) {
    const params = new HttpParams()
      .set('cmd', 'makecuesheet')
      .set('ids2', ids)
      .set('name', cueName)
      .set('albumid', albumid)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  toggleFavoriteLibrarycode(code, favorite) {
    const params = new HttpParams()
      .set('cmd', 'toggle_code_favorite')
      .set('code', code)
      .set('favorite', favorite)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
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
      this.requestUrl, params, { headers: headers}
    );
  }

  updateAlbumTitle(id, title) {
    const params = new HttpParams()
      .set('cmd', 'update_album_title')
      .set('albumid', id)
      .set('title', title);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.requestUrl, params, {
      headers: headers
    });
  }

  updateAlbumDescription(id, text) {
    const params = new HttpParams()
      .set('cmd', 'update_album_description')
      .set('albumid', id)
      .set('description', text);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.requestUrl, params, {
      headers: headers
    });
  }

  updatePerson(options) {
    const params = new HttpParams()
      .set('cmd', 'update_person')
      .set('personId', options.personId)
      .set('type', options.type)
      .set('field', options.field)
      .set('text', options.text)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.requestUrl, params, {
      headers: headers
    });
  }


  updatePieceName(id, albumid, name) {
    const params = new HttpParams()
      .set('cmd', 'update_piece_name')
      .set('pieceid', id)
      .set('albumid', albumid)
      .set('name', name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.requestUrl, params, {
      headers: headers
    });
  }

  controlPlayer(cmd) {
    const params = new HttpParams()
      .set('cmd', 'controlplayer')
      .set('mode', cmd)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  encodeSemiColon(s) {
    return s.replace(/;/g, '&semi-colon');
  }

  updateAlbumTagName(id: number, name: any) {
    const params = new HttpParams()
      .set('cmd', 'update_tag_name')
      .set('id', id.toString())
      .set('name', name)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  split(p) {
    const params = new HttpParams()
      .set('cmd', 'tmp_split')
      .set('path', p)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

}
