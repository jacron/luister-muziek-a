import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UtilService} from '../../../../services/util.service';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-movies-to-new-from-imdb',
  templateUrl: './movies-to-new-from-imdb.component.html',
  styleUrls: ['./movies-to-new-from-imdb.component.scss']
})
export class MoviesToNewFromImdbComponent implements OnInit {
  query: string;
  tt: string;
  myControl = new FormControl();

  constructor(
    private utilService: UtilService,
    private router: Router,
  ) { }

  onPaste(e) {
    const data = e.clipboardData;
    const text = data.getData('text');
    console.log(text);
    // console.log(this.utilService);
    this.tt = this.utilService.parseTitleUrl(text);
  }

  onEnter() {
    if (this.utilService.isValidImdbTitleId(this.query)) {
      this.tt = this.query;
      this.toNew();
    } else {
      window.open(environment.imdbTitleFind + this.query);
    }
  }

  onChange(e) {
    if (!e.length) this.tt = null;
  }

  toNew() {
    this.router.navigate(['movies/new', this.tt]).then();
  }

  ngOnInit() {
  }

}
