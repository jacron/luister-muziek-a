import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wiki} from '../../../../classes/book/wiki';

@Component({
  selector: 'app-author-wiki',
  templateUrl: './author-wiki.component.html',
  styleUrls: ['./author-wiki.component.scss']
})
export class AuthorWikiComponent implements OnInit {
  @Input() wiki: Wiki;
  @Output() picture = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor() { }

  usePicture() {
    this.picture.emit(this.wiki.imgurl);
  }

  closeWiki() {
    this.close.emit();
  }

  ngOnInit() {
  }

}
