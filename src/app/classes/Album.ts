import {Person} from './Person';

export class Album {
  Title: string;
  // AlbumID: number;
  ID: number;
  // Path: string;
  album_performers: Person[];
  album_componisten: Person[];
  pieces: any[];
  cuesheets: any[];
  expanded: boolean;
  album_back_image: boolean;
  album_folder_image: boolean;
}

