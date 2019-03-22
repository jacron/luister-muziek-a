import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wiki} from '../../../../classes/shared/Wiki';

@Component({
  selector: 'app-item-wiki',
  templateUrl: './item-wiki.component.html',
  styleUrls: ['./item-wiki.component.scss']
})
export class ItemWikiComponent implements OnInit {
  @Input() wiki: Wiki;
  @Output() picture = new EventEmitter();
  @Output() pictureUrl = new EventEmitter();
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

  usePictureUrl() {
    this.pictureUrl.emit(this.wiki.imgurl);
  }

  // closeWiki() {
  //   this.close.emit();
  // }

  changeLanguage(lng) {
    this.language.emit(lng);
  }

  pictureUrlSubscribed() {
    return this.pictureUrl.observers.length;
  }

  ngOnInit() {
  }

}
