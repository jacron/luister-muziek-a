import {List} from '../app/classes/music/List';
import {BehaviorSubject, Observable, of} from 'rxjs';

export class MockData {

  // StateService mock

  setTitle(title) {}


  // StorageService mock

  storeList(list: List) {}

  retrieveList() {}


  // ChoiceService mocks

  getFacets() {}


  // MusicService mock

  play(id) {}

  getCodes() { return of([])}

  getCollections() { return of([])}

  getComposers() { return of([])}

  getPerformers() { return of([])}

  getInstruments() { return of([])}

  toggleFavoriteLibrarycode(k_code, checked) {}

  updateLibraryCodeTitle(code, title) {}

  updateLibraryCodeAlias(code, title) {}

  getPerformerAlbums() { return of([])}

  getPerformersGenre() { return of([])}

  getPiecesRecentlyPlayed() { return of([])}

  getInfos() {return of([])}

  getTags() { return of([])}

  getVideoAlbums() { return of ([])}


  // ListService mock
  initialize() {}

}
