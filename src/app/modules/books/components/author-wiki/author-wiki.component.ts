import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wiki} from '../../../../classes/shared/Wiki';
// import {Wiki} from '../../../../classes/shared/Wiki';

@Component({
  selector: 'app-author-wiki',
  templateUrl: './author-wiki.component.html',
  styleUrls: ['./author-wiki.component.scss']
})
export class AuthorWikiComponent implements OnInit {
  @Input() wiki: Wiki;
  @Input() showActions = true;
  @Output() picture = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() language = new EventEmitter();
  @Output() born = new EventEmitter();
  @Output() died = new EventEmitter();

  years = [];

  constructor() { }

  addYears(years) {
    if (years) {
      for (let i = 0; i < years.length; i++) {
        if (this.years.length < 2) {
          this.years.push(years[i]);
        }
      }
    }
  }

  getYears() {
    const re = /[0-9]{4}?/g;
    this.years = [];
    if (this.wiki.description) {
      this.addYears(this.wiki.description.match(re));
    }
    if (this.wiki.extract) {
      this.addYears(this.wiki.extract.match(re));
    }
    return this.years.length;
  }

  useYear1() {
    this.born.emit(this.years[0]);
  }

  useYear2() {
    this.died.emit(this.years[1]);
  }

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
