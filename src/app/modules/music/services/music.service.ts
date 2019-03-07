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

  /* GET */
  getJson(cmd) {
    const musicLibrary = 'http://localhost:3005'
    return this.http.get(musicLibrary + cmd, {
      responseType: 'json'});
  }

  getPerformersGenre(genre) {
    return this.getJson('/performers/genre/' + genre);
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

  getComposers(mode) {
    // mode = 'dropdown' || 'typeahead' || 'startletter'
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

  getSearchedAlbums(params: SearchParams) {
    const search = params.search && params.search.length ? params.search : '@@';
    const cmd = '/cql/' + search + '/' +
      params.idcomp + '/' + params.idperf + '/' + params.idcoll + '/' +
      params.idtag + '/' + params.idinstrument;
    return this.getJson(cmd);
  }

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

  editCue(id, albumid) {
    return this.postForm('/cuesheet/edit', {
      id: id, albumid: albumid
    });
  }

  tagEditor(albumId) {
    return this.postForm('/tag/editor', { albumid: albumId});
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

  addInstrument(instrumentId: number, albumId: number) {
    return this.postForm('/instrument/add',
      {instrumentId: instrumentId, albumId: albumId});
  }

  newInstrument(name, albumId) {
    return this.postForm('/instrument/new',
      {name: name, albumId: albumId});
  }

  newTag(name: string, albumId: number) {
    return this.postForm('/tag/new',
      {name: name, albumId: albumId});
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

  removeAlbum(albumId: number) {
    return this.postForm('/album/delete', {
      albumId
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

  removeInstrument(instrumentId: number, albumId: number) {
    return this.postForm('/instrument/remove', {
      instrumentId: instrumentId, albumId: albumId
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

  updateAlbum(albumid, title, description, asin) {
    return this.postForm('/album/update', {
      albumId: albumid,
      title: title,
      description: description,
      asin: asin,
    });
  }

  // updateAlbumTitle(albumid, title) {
  //   return this.postForm('/album/update/title', {
  //     albumId: albumid,
  //     title: title
  //   });
  // }
  //
  // updateAlbumDescription(albumid, text) {
  //   return this.postForm('/album/update/description', {
  //     albumId: albumid,
  //     description: text
  //   });
  // }

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

  play(id) {  // media center 24
    return this.postForm('/play', {
      pieceId: id,
    });
  }

  play2(id) {  // vlc
    return this.postForm('/play2', {
      pieceId: id,
    });
  }

  playByName(albumId, name) {
    return this.postForm('/play/name', {
      albumId: albumId,
      name,
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

  makeCuesheet2(proposal, albumId) {
    return this.postForm('/cuesheet/create', {
      proposal: proposal,
      albumId: albumId
    });
  }

  // makeCuesheet(cueName, ids, albumId) {
  //   return this.postForm('/cuesheet/make', {
  //     ids: ids,
  //     name: cueName,
  //     albumId: albumId
  //   });
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
