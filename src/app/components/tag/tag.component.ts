import { Component, OnInit } from '@angular/core';
import {Tag} from '../../classes/Tag';
import {MusicService} from '../../shared/services/music.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  startletter = '';
  tags: Tag[];

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
  ) { }

  selectLetter(e) {
    this.startletter = e;
  }

  afterGet(response) {
    this.tags = <Tag[]>response;
    const title = 'Tags (' + this.tags.length + ')';
    this.stateService.setTitle(title);
  }

  ngOnInit() {
    this.musicService.getTags().subscribe(
      response => this.afterGet(response)
    );
  }

}
