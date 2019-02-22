import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MusicService} from '../../../services/music.service';
import {Album} from '../../../../../classes/music/Album';

@Component({
  selector: 'app-album-metatags',
  templateUrl: './album-metatags.component.html',
  styleUrls: ['./album-metatags.component.scss']
})
export class AlbumMetatagsComponent implements OnInit, OnChanges {

  @Input() album: Album;
  tags: any[];
  objectKeys = Object.keys;

  constructor(
    private musicService: MusicService
  ) { }

  ngOnChanges() {
    if (this.album) {
      this.tags = this.album.album_metatags;
    }
  }

  titleKeydown(e, key, text) {
    if (e.key === 'Enter') {
      this.musicService.updateAlbumMetatag(this.album.ID, key, text).subscribe(
        (response) => console.log(response)
      );
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.musicService.updateAlbumMetatag(this.album.ID, key, text).subscribe(
        (response) => console.log(response)
      );
    }
  }

  ngOnInit() {
    if (this.album) {
      this.tags = this.album.album_metatags;
    }
  }

}
