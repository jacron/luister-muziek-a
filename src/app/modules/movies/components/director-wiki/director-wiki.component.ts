import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-director-wiki',
  templateUrl: './director-wiki.component.html',
  styleUrls: ['./director-wiki.component.scss']
})
export class DirectorWikiComponent implements OnInit {
  @Input() wiki;
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
