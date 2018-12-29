import { Injectable } from '@angular/core';
import {Album} from '../classes/Album';
import {SearchParams} from '../classes/SearchParams';
import {List} from '../classes/List';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getAlbumIds(albums): string[] {
    return albums.map(album => album.ID);
  }

  getAlbumsForList(albums): any[] {
    return albums.map(album => {
      return {
        Title: album.Title,
        ID: album.ID,
      };
    });
  }

  getItemIds(items): string[] {
    return items.map(item => item.Album.ID + '/' + item.Piece.ID);
  }

  initializeRecent(items): List {
    const albums = items.map(item => item.Album);
    const count = albums ? albums.length : 0;
    const params: SearchParams = null;
    return {
      title: document.title,
      albumIds: this.getItemIds(items),
      albums: this.getAlbumsForList(albums),
      url: '/recent',
      params,
      count,
    };

  }

  initialize(albums: Album[], params: SearchParams, url): List {
    const count = albums ? albums.length : 0;
    return {
      title: document.title,
      albumIds: this.getAlbumIds(albums),
      albums: this.getAlbumsForList(albums),
      url,
      params,
      count,
    };
  }
}
