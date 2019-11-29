import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  @Input() albums: Album[];
  coverHeight = 100;

  constructor(
    private musicService: MusicService,
  ) { }

  imageUrl(id) {
    return this.musicService.albumImageUrl(id, -1, this.coverHeight);
    // return `${this.imgUrl}${id}/album/-1/100/`;
  }

  ngOnInit() {
  }

}
