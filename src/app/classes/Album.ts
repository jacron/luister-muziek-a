import {Person} from './Person';
import {Tag} from './Tag';
import {Instrument} from './Instrument';

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
  album_instrument: Instrument;
  pieces: any[];
  cuesheets: any[];
  expanded: boolean;
  album_back_image: boolean;
  mother: Album;
  website: string;
  // album_folder_image: boolean;

  // constructor() { this.expanded = true; }
}

