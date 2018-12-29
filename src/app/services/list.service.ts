import { Injectable } from '@angular/core';
import {Album} from '../classes/Album';
import {SearchParams} from '../classes/SearchParams';
import {List} from '../classes/List';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getAlbumIds(albums): number[] {
    const ids = [];
    if (Array.isArray(albums)) {
      albums.forEach(album => ids.push(album.ID));
    }
    return ids;
  }


  getAlbumsForList(albums): any[] {
    const listAlbums = [];
    if (Array.isArray(albums)) {
      albums.forEach((album: Album) => listAlbums.push({
        Title: album.Title,
        ID: album.ID,
      }));
    }
    return listAlbums;
  }

  initialize(albums: Album[], params: SearchParams): List {
    const count = albums ? albums.length : 0;
    return {
      title: document.title,
      albumIds: this.getAlbumIds(albums),
      albums: this.getAlbumsForList(albums),
      url: '/search',
      params,
      count,
    };
  }
}
