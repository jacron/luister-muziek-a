import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

const keyCoversize = 'mzkCoversize';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private coverSize$ = new BehaviorSubject(localStorage.getItem(keyCoversize));
  currentCoverSize = this.coverSize$.asObservable();

  constructor() {}

  setCoverSize(size) {
    localStorage.setItem(keyCoversize, size);
    this.coverSize$.next(size);
  }

  getCoverSize(deflt: number): string {
    return localStorage.getItem(keyCoversize) || deflt.toString();
  }
}
