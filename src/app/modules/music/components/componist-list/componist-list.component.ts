import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicService} from '../../services/music.service';
import {StateService} from '../../../../services/state.service';
import {Album} from '../../../../classes/music/Album';
import {Person} from '../../../../classes/music/Person';

@Component({
  selector: 'app-componist-list',
  templateUrl: './componist-list.component.html',
  styleUrls: ['./componist-list.component.scss']
})
export class ComponistListComponent implements OnInit {
  albums: Album[];
  person: Person;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private stateService: StateService,
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      this.fetchThings(params);
    }
  }

  afterGetComposer(performer, count) {
    this.person = performer;
    const {FirstName, LastName} = this.person;
    const title = `${FirstName} ${LastName} (${count})`;
    this.stateService.setTitle(title);
  }

  afterGetAlbums(albums, id) {
    this.albums = albums;
    console.log(albums);
    this.musicService.getComposerById(id).subscribe(
      performer => this.afterGetComposer(performer, albums.length)
    )
  }

  fetchThings(params) {
    this.albums = [];
    const id = params.id;
    this.musicService.getComposerAlbums(id).subscribe(
      (albums: Album[]) => this.afterGetAlbums(albums, id),
      err => console.error(err),
      () => {}
    );
  }

  ngOnInit() {
  }

}
