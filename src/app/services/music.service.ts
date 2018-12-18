import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MusicService {

  requestUrl = environment.apiServer;
  constructor(private http: HttpClient) { }

  /* GET */
  getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  getComposers(mode) {
    return this.getJson('/composers/mode/' + mode);
  }

  getPerformers(mode) {
    return this.getJson('/performers/mode/' + mode);
  }

  getCollections() {
    return this.getJson('/collections');
  }

  getTags() {
    return this.getJson('/tags');
  }

  getInstruments() {
    return this.getJson('/instruments');
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

  getAlbumCountForPerson(id, person_type) {
    return this.getJson('/person/albums/count/' + id + '/' + person_type);
  }

  getSearchedAlbums(params) {
    const search = 'zoek'; // todo: get search (title)
    const url = this.requestUrl + '/cql/' + search + '/' +
      params.idcomp + '/' + params.idperf + '/' + params.idcoll + '/' +
      params.idtag + '/' + params.idinstrument;
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

  getAlbumByPath(path) {
    return this.postForm('/album/path', { path: path });
  }

  editCue(id, albumid) {
    return this.postForm('/cuesheet/edit', {id: id, albumid: albumid});
  }

  tagEditor(path) {
    return this.postForm('/tag/editor', { path: path});
  }

  deleteCue(id, albumid) {
    return this.postForm('/cuesheet/delete', {id: id, albumid: albumid});
  }

  openFinder(id) {
    const params = {objectid: id};
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

  // newPerformer(name, albumId) {
  //   return this.postForm('/performer/new', {
  //     albumid: albumId,
  //     name: name
  //   });
  // }
  //
  // newComposer(name, albumId) {
  //   return this.postForm('/composer/new', {
  //     albumid: albumId,
  //     name: name
  //   });
  // }

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
  }

  updateAlbumTitle(albumid, title) {
    return this.postForm('/album/update/title', {
      albumId: albumid,
      title: title
    });
  }

  updateAlbumDescription(albumid, text) {
    return this.postForm('/album/update/description', {
      albumId: albumid,
      description: text
    });
  }

  updatePerson(options) {
    return this.postForm('/person/update', {
      personId: options.personId,
      personType: options.type,
      field: options.field,
      text: options.text
    });
  }


  updatePieceName(id, albumid, name) {
    return this.postForm('/piece/update', {
      albumId: albumid,
      pieceId: id,
      name: name,
    });
  }

  play(id) {
    return this.postForm('/play', {
      pieceId: id,
      name: name,
    });
  }

  controlPlayer(cmd) {
    return this.postForm('/play/control', {
      cmd: cmd,
    });
  }

  pastePersonImage(personId, type) {
    return this.postForm('/image/paste/person', {
      personId: personId,
      type: type
    });
  }

  pasteAlbumImage(albumid) {
    return this.postForm('/image/paste/album', {
      albumId: albumid,
    });
  }

  updateLibraryCodeAlias(code, text) {
    // not implemented
    return this.postForm('/code/update/alias', {
      code: code,
      text: text
    });
    // const params = new HttpParams()
    //   .set('cmd', 'update_librarycode_alias')
    //   .set('code', code)
    //   .set('text', text)
    // ;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

  updateLibraryCodeTitle(code, text) {
    // not implemented
    return this.postForm('/code/update/title', {
      code: code,
      text: text
    });
  }

  uploadAlbumByPath(path) {
    // not implemented
    return this.postForm('/album/upload', {
      path: this.encodeSemiColon(path),
    });
    // const params = new HttpParams()
    //   .set('cmd', 'upload')
    //   .set('path', this.encodeSemiColon(path));
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

  updateAlbumMetatag(albumId, key, text) {
    // not implemented
    return this.postForm('/album/update/metatag', {
      key: key,
      text: text,
      albumId: albumId
    });
    // const params = new HttpParams()
    //   .set('cmd', 'update_metatag')
    //   .set('tag', key)
    //   .set('value', text)
    //   .set('albumid', albumId)
    // ;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

  newTag(name, albumId) {
    return this.postForm('/tag/new', {
      name: name,
      albumId: albumId
    });
  }

  openwebsite(albumId) {
    return this.postForm('/openwebsite', {
      albumId: albumId
    });
  }

  // nameCueFromFilename(id, albumId) {
  //   // not implemented
  //   return this.postForm('/cuesheet/namefromfilename', {
  //     albumId: albumId,
  //     pieceId: id,
  //   });
  //   // const params = new HttpParams()
  //   //   .set('cmd', 'cuesheet_title_from_filename')
  //   //   .set('id', id)
  //   //   .set('albumid', albumid)
  //   // ;
  //   // const headers = new HttpHeaders();
  //   // headers.append('Content-Type', 'application/json');
  //   // return this.http.post(
  //   //   this.requestUrl, params, { headers: headers}
  //   // );
  // }

  // nameCueToFilename(id, albumId, title) {
  //   // not implemented
  //   return this.postForm('/cuesheet/nametofilename', {
  //     albumId: albumId,
  //     pieceId: id,
  //     title: title,
  //   });
  //   // const params = new HttpParams()
  //   //   .set('cmd', 'cuesheet_title_to_filename')
  //   //   .set('id', id)
  //   //   .set('albumid', albumid)
  //   //   .set('title', title)
  //   // ;
  //   // const headers = new HttpHeaders();
  //   // headers.append('Content-Type', 'application/json');
  //   // return this.http.post(
  //   //   this.requestUrl, params, { headers: headers}
  //   // );
  // }

  makeCuesheet(cueName, ids, albumId) {
    return this.postForm('/cuesheet/make', {
      ids: ids,
      name: cueName,
      albumId: albumId
    });
    // const params = new HttpParams()
    //   .set('cmd', 'makecuesheet')
    //   .set('ids2', ids)
    //   .set('name', cueName)
    //   .set('albumid', albumid)
    // ;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

  toggleFavoriteLibrarycode(code, favorite) {
    return this.postForm('/code/favorite/toggle', {
      code: code,
      favorite: favorite
    });
    // const params = new HttpParams()
    //   .set('cmd', 'toggle_code_favorite')
    //   .set('code', code)
    //   .set('favorite', favorite)
    // ;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

  encodeSemiColon(s) {
    return s.replace(/;/g, '&semi-colon');
  }

  updateAlbumTagName(albumId: number, name: any) {
    // not implemented
    return this.postForm('/album/tag/update', {
      albumId: albumId,
      name: name
    });
    // const params = new HttpParams()
    //   .set('cmd', 'update_tag_name')
    //   .set('id', id.toString())
    //   .set('name', name)
    // ;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

  split(path) {
    // not implemented
    return this.postForm('/split', {
      path: path
    });
    // const params = new HttpParams()
    //   .set('cmd', 'tmp_split')
    //   .set('path', p)
    // ;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.requestUrl, params, { headers: headers}
    // );
  }

}
