import {Track} from './Track';

export class CFile {
  name: string;
  displayname?: string;
  proposedname?: string;
  tracks: Track[];
  played?: boolean;
}
