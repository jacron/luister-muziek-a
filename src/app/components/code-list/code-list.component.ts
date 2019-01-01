import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicService} from '../../services/music.service';
import {LibraryCode} from '../../classes/LibraryCode';
import {environment} from '../../../environments/environment';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.scss']
})
export class CodeListComponent implements OnInit {

  libraryCodes: LibraryCode[];
  googleUrl = environment.googleUrl;
  imageUrl = environment.apiServer + '/image/';
  fav = false;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  afterGet(response) {
    console.log(response);
    this.libraryCodes = response.items;
    // document.title = response.page_title;
    this.stateService.setTitle(response.page_title);
  }

  handleParams(params) {
    console.log(params);
    if (params) {
      if (params.code) {
        this.musicService.getCode(params.code).subscribe(
          response => this.afterGet(response)
        );
      }
    }
  }

  onPlayed(response, piece) {
    console.log(response);
    piece.played = true;
  }

  play(piece) {
    console.log(piece);
    this.musicService.play(piece.Piece.ID).subscribe(
      (response) => this.onPlayed(response, piece)
    );
  }

  changeFavorite(e, item: LibraryCode) {
    // console.log(e);
    this.musicService.toggleFavoriteLibrarycode(item.k_code, e.checked).subscribe(

    );
  }

  openGoogle(item: LibraryCode) {
    window.open(this.googleUrl + document.title + ' ' + item.k_code)
  }

  updateTitle(code, title) {
    this.musicService.updateLibraryCodeTitle(code, title).subscribe(
      (response) => console.log(response)
    );
  }

  titleKeydown(e, code, title) {
    if (e.key === 'Enter') {
      this.updateTitle(code, title);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updateTitle(code, title);
    }
  }

  updateAlias(code, title) {
    this.musicService.updateLibraryCodeAlias(code, title).subscribe(
      (response) => console.log(response)
    );
  }

  aliasKeydown(e, code, title) {
    if (e.key === 'Enter') {
      this.updateAlias(code, title);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updateAlias(code, title);
    }
  }

  ngOnInit() {
  }

}
