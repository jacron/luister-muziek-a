import {Album} from './Album';

export class Albums {
  constructor() {
    this.mothers = [];
    this.children = [];
  }

  mothers: Album[];
  children: Album[];
}

