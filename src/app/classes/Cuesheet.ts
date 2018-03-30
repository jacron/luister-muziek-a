import {Cue} from './Cue';

export class Cuesheet {
  Filename: string;
  Title: string;
  ID: number;
  cue: Cue[];
  Code: string;
  Invalid: boolean;
  played: boolean;
}
