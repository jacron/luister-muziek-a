import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {environment} from '../../../../../environments/environment';
import {StorageService} from '../../../../services/storage.service';
import {ListService} from '../../services/list.service';
import {StateService} from '../../../../services/state.service';
import {RecentItem} from '../../../../classes/music/RecentItem';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {
  items: RecentItem[];
  imgUrl = environment.musicServer + '/image/';

  constructor(
    private musicService: MusicService,
    private storageService: StorageService,
    private stateService: StateService,
    private listService: ListService,
  ) { }

  getItemByPieceId(id): RecentItem {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.Piece.ID === id) {
        return item;
      }
    }
    return null;
  }

  onPlayed(response, id) {
    const item = this.getItemByPieceId(id);
    item.played = true;
  }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  afterGetPieces(items) {
    this.items = items;
    const title = 'Recent';
    document.title = title;
    this.stateService.setTitle(title);

    const list = this.listService.initializeRecent(items);
    this.storageService.storeList(list);
  }

  ngOnInit() {
    this.musicService.getPiecesRecentlyPlayed().subscribe(
      response => this.afterGetPieces(response)
    );
  }

}
