import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private title$ = new BehaviorSubject('Music-Client');
  currentTitle = this.title$.asObservable();

  constructor() {}

  setTitle(title: string): void {
    this.title$.next(title);
    document.title = title;
  }
}
