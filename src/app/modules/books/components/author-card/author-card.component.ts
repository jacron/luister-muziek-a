import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {environment} from '../../../../../environments/environment';
import {DialogAuthorComponent} from '../../dialogs/dialog-author/dialog-author.component';
import {MatDialog} from '@angular/material/dialog';
// import {Wiki} from '../../../../classes/book/wiki';

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

  imageUrl = environment.booksServer + '/image/author/';
  wikiCache;

  constructor(
    private dialog: MatDialog,
  ) { }

  setWiki(e) {
    this.wikiCache = e;
    this.wiki.emit(this.wikiCache);
  }

  setRefresh(e) {
    this.refresh = e;
    this.wikiCache.imgurl = null;
    this.wiki.emit(this.wikiCache);
  }

  afterSaved(author) {
      for (let prop in author) {
        if (author.hasOwnProperty(prop)) {
          this.author[prop] = author[prop];
        }
      }
  }

  afterRemoved(author) {
      this.author.deleted = true;
  }

  afterEdit(result) {
    if (!result || !result.author) {
      return;
    }
    const {status, author} = result;
    switch(status) {
      case 'saved':
        this.afterSaved(author);
        break;
      case 'removed':
        this.afterRemoved(author);
        break;
    }
  }

  toggleEdit() {
    // this.edit.emit();
    const dialogRef = this.dialog.open(DialogAuthorComponent, {
      data: {
        width: '600px',
        author: this.author
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEdit(result)
    );
  }

  ngOnInit() {
  }

}
