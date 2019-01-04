import {Track} from './Track';

export class CFile {
  name: string;
  shortname?: string;
  tracks: Track[];
  played?: boolean;
}
