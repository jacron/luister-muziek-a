import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {environment} from '../../environments/environment';
import {MusicService} from '../music.service';

@Component({
  selector: 'app-album-thumb',
  templateUrl: './album-thumb.component.html',
  styleUrls: ['./album-thumb.component.scss'],
})
export class AlbumThumbComponent implements OnInit {

  imgUrl = environment.apiServer + '/image/';

  @Input('album') album: Album;
  constructor( private musicService: MusicService ) {
  }

  openFinder(id) {
    this.musicService.openFinder(id).subscribe(
      (response) => console.log(response)
    );
  }

  restorePieces(album) {
    console.log(album);
    this.album = album;
  }

  refetch(albumId) {
    this.musicService.refetch(albumId).subscribe(
      (response) => this.restorePieces(response)
    );
  }

  ngOnInit() {
  }

}
