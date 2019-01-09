import {Piece} from './Piece';

export class Proposal {
  name: string;
  ids?: number[];
  pieces?: Piece[];
  created?;
  marked?;
}
