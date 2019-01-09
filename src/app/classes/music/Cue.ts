import {CFile} from './CFile';

export class Cue {
  title: string;
  performer: string;
  performers: string[];
  files: CFile[];
  rem: string[];
}
