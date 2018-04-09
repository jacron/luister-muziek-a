import {Person} from './Person';
import {Tag} from './Tag';

export class Album {
  Title: string;
  // AlbumID: number;
  ID: number;
  Path: string;
  Description: string;
  album_performers: Person[];
  album_componisten: Person[];
  album_metatags: any;
  album_tags: Tag[];
  pieces: any[];
  cuesheets: any[];
  expanded: boolean;
  album_back_image: boolean;
  mother: Album;
  website: string;
  // album_folder_image: boolean;

  // constructor() { this.expanded = true; }
}

