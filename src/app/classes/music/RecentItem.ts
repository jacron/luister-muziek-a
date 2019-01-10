import {Album} from './Album';
import {Piece} from './Piece';

export class RecentItem {
  Album: Album;
  Piece: Piece;
  played?: boolean;
  Invalid?: boolean;
}
