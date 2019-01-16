import {List} from '../app/classes/music/List';
import {BehaviorSubject, Observable, of} from 'rxjs';

export class MockData {

  getCodes() { return of([])}

  getCollections() {return of([])}

  getComposers() {return of([])}

  // StateService mock
  setTitle(title) {}

  // StorageService mock
  storeList(list: List) {}

  // MusicService mock
  play(id) {}


  toggleFavoriteLibrarycode(k_code, checked) {}

  updateLibraryCodeTitle(code, title) {}

  updateLibraryCodeAlias(code, title) {}

}
