import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  storage = {};

  constructor() { }

  setItem(key: string, s: string) {
    this.storage[key] = s;
  }

  getItem(key: string): string {
    return this.storage[key];
  }
}
