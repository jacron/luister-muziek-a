import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Collection} from '../../classes/music/Collection';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collecties',
  templateUrl: './collecties.component.html',
  styleUrls: ['./collecties.component.scss']
})
export class CollectiesComponent implements OnInit {
  @Input() collections: Collection[];
  @Input() startletter: string;
  imgUrl = environment.apiServer + '/image/';

  constructor(
  ) { }

  ngOnInit() {
  }

}
