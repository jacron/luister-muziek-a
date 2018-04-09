import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const requestUrl = 'http://127.0.0.1:8010/ajax/';

@Injectable()
export class MusicService {

  constructor(private http: HttpClient) { }

  /* GET */
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

  getAlbumCountForTag(id) {
    const params = new HttpParams()
      .set('cmd', 'album_count_for_tag')
      .set('id', id);
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  getAlbumCountForPerson(id, type) {
    const params = new HttpParams()
      .set('cmd', 'album_count_for_person')
      .set('id', id)
      .set('type', type)
    ;
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
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
      // .set('format', '%Last, %First')
    ;
    return this.http.get(requestUrl, {
      responseType: 'json',
      params});
  }

  getPerformers(selection) {
    const params = new HttpParams()
      .set('cmd', 'performers')
      .set('selection', JSON.stringify(selection))
      // .set('format', '%Last, %First')
    ;
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

  /* POST */
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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

  renameCue(id, albumid) {
    const params = new HttpParams()
      .set('cmd', 'cuesheet_title_from_filename')
      .set('id', id)
      .set('albumid', albumid)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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

  updateAlbumDescription(id, text) {
    const params = new HttpParams()
      .set('cmd', 'update_album_description')
      .set('albumid', id)
      .set('description', text);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(requestUrl, params, {
      headers: headers
    });
  }

  pastePersonImage(personId, type) {
    const params = new HttpParams()
      .set('cmd', 'paste_person')
      .set('id', personId)
      .set('type', type)
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(requestUrl, params, {
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
    return this.http.post(requestUrl, params, {
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
    return this.http.post(requestUrl, params, {
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
    return this.http.post(requestUrl, params, {
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

  addComposer(composerId: number, albumId: number) {
    const params = new HttpParams()
      .set('cmd', 'add_componist')
      .set('componistid', composerId.toString())
      .set('albumid', albumId.toString())
    ;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
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
      requestUrl, params, { headers: headers}
    );

  }
}
