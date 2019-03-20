import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SearchParams} from '../../../classes/music/SearchParams';

@Injectable()
export class MusicService {
  requestUrl = environment.musicServer;


  constructor(
    private http: HttpClient
  ) { }

  /*
  utility
   */
  albumImageUrl(albumId, w=-1, h=-1) {
    return `${this.requestUrl}/image/${albumId}/album/${w}/${h}`;
  }

  albumBackImageUrl(albumId, w=-1, h=-1) {
    return `${this.requestUrl}/image/back/${albumId}/album/${w}/${h}`;
  }

  /* GET */
  getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  /*
  * albums
  */
  getSearchedAlbums(params: SearchParams) {
    const search = params.search && params.search.length ? params.search : '@@';
    const cmd = '/albums/cql/' + search + '/' +
      params.idcomp + '/' + params.idperf + '/' + params.idcoll + '/' +
      params.idtag + '/' + params.idinstrument;
    return this.getJson(cmd);
  }


  /*
  * composers
  * mode  = 'dropdown' || 'typeahead' || 'startletter'
  * mode: soon to be obsolete
   */
  getComposers(mode) {
    return this.getJson('/composers/mode/' + mode);
  }


  /*
   * performers
   */
  getPerformersGenre(genre) {
    return this.getJson('/performers/genre/' + genre);
  }

  getPerformers(mode) {
    return this.getJson('/performers/mode/' + mode);
  }

  getPerformerAlbums(idPerformer) {
    return this.getJson('/performers/' + idPerformer + '/albums');
  }

  getPiecesRecentlyPlayed(n = 20) {
    return this.getJson('/pieces/recent/' + n);
  }

  getVideoAlbums(genre) {
    return this.getJson('/videos/' + genre);
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

  getInstrumentById(id) {
    return this.getJson('/instruments/' + id);
  }

  getCollectionById(id) {
    return this.getJson('collections/' + id);
  }

  getTagById(id) {
    return this.getJson('tag/' + id);
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

  getAlbumCountForInstrument(id) {
    return this.getJson('/instrument/albums/count/' + id);
  }

  getAlbumCountForPerson(id, person_type) {
    return this.getJson('/person/albums/count/' + id + '/' + person_type);
  }

  // getComposerAlbums(idComposer) {
  //   return this.getJson('/composer/' + idComposer + '/albums');
  // }

  getTagAlbums(id) {
    return this.getJson('/tag/' + id + '/albums');
  }

  // getCollectionAlbums(id) {
  //   return this.getJson('/collection/' + id + '/albums');
  // }

  // getNewSearchedAlbums(chips) {
  //   return this.postForm('/search/chips', {
  //     chips
  //   });
  // }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  /*
  *   albums
  */
  updateAlbum(albumid, title, description, asin) {
    return this.postForm(`/albums/${albumid}/update`, {
      title: title,
      description: description,
      asin: asin,
    });
  }

  pasteAlbumImage(albumid) {
    return this.postForm(`/albums/${albumid}/paste`, {});
  }

  addComposer(composerId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/composer/${composerId}/add`, {});
  }

  newComposer(name, albumId) {
    return this.postForm(`/albums/${albumId}/composer/new`, {
      name: name
    });
  }

  removeComposer(composerId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/composer/${composerId}/remove`, {});
  }

  addPerformer(performerId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/performer/${performerId}/add`, {});
  }

  newPerformer(name, albumId) {
    return this.postForm(`/albums/${albumId}/performer/new`, {
      name: name
    });
  }

  removePerformer(performerId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/performer/${performerId}/remove`, {});
  }

  addTag(tagId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/tag/${tagId}/add`, {});
  }

  newTag(name: string, albumId: number) {
    return this.postForm(`/albums/${albumId}/tag/new`,
      {name: name});
  }

  removeTag(tagId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/tag/${tagId}/remove`, {
      tagId: tagId, albumId: albumId
    });
  }

  addInstrument(instrumentId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/instrument/${instrumentId}/add`,
      {instrumentId: instrumentId, albumId: albumId});
  }

  newInstrument(name, albumId) {
    return this.postForm(`/albums/${albumId}/instrument/new`,
      {name: name});
  }

  removeInstrument(instrumentId: number, albumId: number) {
    return this.postForm(`/albums/${albumId}/instrument/remove`, {
      instrumentId: instrumentId, albumId: albumId
    });
  }

  makeCuesheet(proposal, albumId) {
    return this.postForm(`/albums/${albumId}/cuesheet/new`, {proposal});
  }

  updateCuesheetTitle(cuesheetFilename, albumId, title) {
    return this.postForm(`/albums/${albumId}/cuesheet/updatetitle`, {cuesheetFilename, title});
  }

  deleteCue(cuesheetFilename, id, albumId) {
    return this.postForm(`/albums/${albumId}/cuesheet/${id}/delete`, {cuesheetFilename});
  }

  editCue(filename, albumId) {
    return this.postForm(`/albums/${albumId}/cuesheet/edit`, {filename});
  }

  playByName(albumId, name) {
    return this.postForm(`/albums/${albumId}/play`, {name});
  }

  /*
  * tags
  */
  tagEditor(albumId) {
    return this.postForm('/tags/edit/' + albumId, {});
  }

  /*
    finder
   */
  openFinder(id) {
    return this.postForm('/finder/album/' + id, {});
  }

  /*
    pieces
   */
  play(id) {  // media center 24
    return this.postForm('/pieces/play/0/' + id, {});
  }

  play2(id) {  // vlc
    return this.postForm('/pieces/play/1/' + id, {});
  }

  /*

   */
  controlPlayer(cmd) {
    return this.postForm('/player', {
      cmd: cmd,
    });
  }

  saveAliasPiece(id, displayname) {
    return this.postForm('/piece/alias', {
      id: id,
      displayname: displayname
    });
  }

  addSearchToHistory(title: string, params: SearchParams) {
    return this.postForm('/search/history', {
      title,
      params
    });
  }

  getAlbumByPath(path) {
    return this.postForm('/album/path', { path: path });
  }

  removeAlbum(albumId: number) {
    return this.postForm('/album/delete', {
      albumId
    });
  }

  refetch(id) {
    return this.postForm('/pieces/reload', {
      albumId: id
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

  pastePersonImage(personId, type) {
    return this.postForm('/image/paste/person', {
      personId: personId,
      type: type
    });
  }

  updateLibraryCodeAlias(code, text) {
    // not implemented
    return this.postForm('/code/update/alias', {
      code: code,
      text: text
    });
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
  }

  updateAlbumMetatag(albumId, key, text) {
    // not implemented
    return this.postForm('/album/update/metatag', {
      key: key,
      text: text,
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

  toggleFavoriteLibrarycode(code, favorite) {
    return this.postForm('/code/favorite/toggle', {
      code: code,
      favorite: favorite
    });
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
