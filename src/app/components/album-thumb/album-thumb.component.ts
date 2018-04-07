import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../classes/Album';
import {environment} from '../../../environments/environment';
import {MusicService} from '../../services/music.service';

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

  restorePieces(album: Album) {
    console.log(album);
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets
  }

  refetch(albumId) {
    this.musicService.refetch(albumId).subscribe(
      (response: Album) => this.restorePieces(response)
    );
  }

  ngOnInit() {
  }

}
