import {Component, Input, OnInit} from '@angular/core';
import {Collection} from '../../../../classes/music/Collection';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-collecties',
  templateUrl: './collecties.component.html',
  styleUrls: ['./collecties.component.scss']
})
export class CollectiesComponent implements OnInit {
  @Input() collections: Collection[];
  @Input() startletter: string;
  coverHeight = 100;
  result: Collection[];

  constructor(
    private musicService: MusicService,
  ) { }

  imageUrl(id) {
    // return `${this.imgUrl}${id}/album/-1/100/`;
    return this.musicService.albumImageUrl(id, -1, this.coverHeight);
  }

  ngOnInit() {
  }

}
