import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {environment} from '../../../../../environments/environment';
import {Wiki} from '../../../../classes/book/wiki';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {
  @Input() author: Author;
  @Input() booksCount: number;
  @Input() refresh: string;
  @Output() edit = new EventEmitter();
  @Output() wiki = new EventEmitter();

  imageUrl = environment.booksServer + '/authorpicture/';
  wikiCache: Wiki;

  constructor() { }

  setWiki(e: Wiki) {
    this.wikiCache = e;
    this.wiki.emit(this.wikiCache);
  }

  setRefresh(e) {
    this.refresh = e;
    this.wikiCache.imgurl = null;
    this.wiki.emit(this.wikiCache);
  }

  toggleEdit() {
    this.edit.emit();
  }

  ngOnInit() {
  }

}
