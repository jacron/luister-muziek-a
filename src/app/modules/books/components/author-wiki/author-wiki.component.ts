import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {Wiki} from '../../../../classes/book/wiki';

@Component({
  selector: 'app-author-wiki',
  templateUrl: './author-wiki.component.html',
  styleUrls: ['./author-wiki.component.scss']
})
export class AuthorWikiComponent implements OnInit {
  @Input() wiki;
  @Input() showActions = true;
  @Output() picture = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() language = new EventEmitter();

  constructor() { }

  usePicture() {
    this.picture.emit(this.wiki.imgurl);
  }

  closeWiki() {
    this.close.emit();
  }

  changeLanguage(lng) {
    this.language.emit(lng);
  }

  ngOnInit() {
  }

}
