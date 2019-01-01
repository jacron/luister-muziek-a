import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MusicService} from '../../../shared/services/music.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-instrument',
  templateUrl: './dialog-instrument.component.html',
  styleUrls: ['./dialog-instrument.component.scss']
})
export class DialogInstrumentComponent implements OnInit {
  albumCount: number;
  title: string;

  constructor(
    private musicService: MusicService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  toSearch() {
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: -1,
        idcoll: -1,
        idtag: -1,
        idinstrument: this.data.album.album_instrument.ID
      }
    ]).then();
  }

  afterAlbumCount(response) {
    this.albumCount = response.count;
  }

  ngOnInit() {
    const album_instrument = this.data.album.album_instrument;
    this.title = album_instrument.Name;
    this.musicService.getAlbumCountForInstrument(album_instrument.ID)
      .subscribe(
      (response) => this.afterAlbumCount(response)
    );
  }

}
