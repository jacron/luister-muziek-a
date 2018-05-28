import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

// const requestUrl = 'http://127.0.0.1:8010/ajax/';

@Injectable()
export class MusicService {

  requestUrl = environment.apiServer;
  constructor(private http: HttpClient) { }

  getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  /* GET */
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
    const params = new HttpParams()
      .set('cmd', 'infos');
    return this.http.get(this.requestUrl, {
      responseType: 'json',
      params});
  }

  getCodes() {
    const params = new HttpParams()
      .set('cmd', 'codes');
    return this.http.get(this.requestUrl, {
      responseType: 'json',
      params});
  }

  getCode(code) {
    const params = new HttpParams()
      .set('cmd', 'code')
      .set('code', code)
      .set('favorite', 'false')
    ;
    return this.http.get(this.requestUrl, {
      responseType: 'json',
      params});
  }

  getAlbumByPath(path) {
    const params = new HttpParams()
      .set('cmd', 'album_by_path')
      .set('path', path);
    return this.http.get(this.requestUrl, {
      responseType: 'json',
      params});
  }

  getAlbumCountForTag(id) {
    const params = new HttpParams()
      .set('cmd', 'album_count_for_tag')
      .set('id', id);
    return this.http.get(this.requestUrl, {
      responseType: 'json',
      params});
  }

  getAlbumCountForPerson(id, type) {
    const params = new HttpParams()
      .set('cmd', 'album_count_for_person')
      .set('id', id)
      .set('type', type)
    ;
    return this.http.get(this.requestUrl, {
      responseType: 'json',
      params});
  }

  getSearchedAlbums(params) {
    const search = 'zoek'; // todo: get search (title)
    const url = this.requestUrl + 'cql/' + search + '/' +
      params.idcomp + '/' + params.idperf + '/' + params.idcoll + '/' +
      params.idtag;
    return this.http.get(url, {
      responseType: 'json'});
  }

  /* POST */
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

  newPerformer(name, albumId) {
    const params = new HttpParams()
      .set('cmd', 'new_performer')
      .set('name', name)
      .set('albumid', albumId)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  newComposer(name, albumId) {
    const params = new HttpParams()
      .set('cmd', 'new_componist')
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

  refetch(id) {
    const params = new HttpParams()
      .set('cmd', 'refetch')
      .set('albumid', id)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
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
      this.requestUrl, params, { headers: headers}
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

  deleteCue(id, albumid) {
    const params = new HttpParams()
      .set('cmd', 'removecuesheet')
      .set('id', id)
      .set('albumid', albumid)
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

  updateCuesheetTitle(id, albumid, title) {
    const params = new HttpParams()
      .set('cmd', 'update_cuesheet_title')
      .set('id', id)
      .set('albumid', albumid)
      .set('title', title);
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

  tagEditor(path) {
    // console.log(path);
    const params = new HttpParams()
      .set('cmd', 'tageditor')
      .set('path', this.encodeSemiColon(path))
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  addComposer(composerId: number, albumId: number) {
    const params = new HttpParams()
      .set('cmd', 'add_componist')
      .set('componistid', composerId.toString())
      .set('albumid', albumId.toString())
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  addPerformer(performerId: number, albumId: number) {
    const params = new HttpParams()
      .set('cmd', 'add_performer')
      .set('performerid', performerId.toString())
      .set('albumid', albumId.toString())
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  addTag(tagId: number, albumId: number) {
    const params = new HttpParams()
      .set('cmd', 'add_tag')
      .set('tagid', tagId.toString())
      .set('albumid', albumId.toString())
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  removeComposer(composerId: number, albumId: number) {
    const params = new HttpParams()
      .set('cmd', 'remove_componist')
      .set('id', composerId.toString())
      .set('albumid', albumId.toString())
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  removePerformer(performerId: number, albumId: number) {
    const params = new HttpParams()
      .set('cmd', 'remove_performer')
      .set('id', performerId.toString())
      .set('albumid', albumId.toString())
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
  }

  removeTag(tagId: number, albumId: number) {
    const params = new HttpParams()
      .set('cmd', 'remove_tag')
      .set('id', tagId.toString())
      .set('albumid', albumId.toString())
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl, params, { headers: headers}
    );
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
