import {Cue} from './Cue';
import {CFile} from './CFile';

export class Cuesheet {
  filename?: string;
  title: string;
  id: number;
  cue: Cue;
  // Code: string;
  invalid: boolean;
  LibraryCode?: string;
  played: boolean;
  asin: string;
  discid: string;
  performer: string;
  performers: string[];
  files: CFile[];
  rem: string[];
}
