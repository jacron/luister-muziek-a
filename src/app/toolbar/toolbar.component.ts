import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {MusicService} from '../music.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('album') album: Album;

  constructor(    private musicService: MusicService,
                  private router: Router,
  ) { }

  albumTitleKeydown(e, id, title) {
    console.log(id, title);
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateAlbumTitle(id, title);
    }
    if (e.key === 'Tab') {
      this.updateAlbumTitle(id, title);
    }
  }

  toCollection(id) {
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: -1,
        idcoll: id
      }
    ]).then(() => {
    });
  }

  openFinder(id) {
    this.musicService.openFinder(id).subscribe(
      (response) => console.log(response)
    );
  }

  restorePieces(album: Album) {
    console.log(album);
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  tagedit() {
    this.musicService.tagEditor(this.album.Path).subscribe();
  }

  pause() {
    this.musicService.controlPlayer('pause').subscribe();
  }

  refetch(albumId) {
    this.musicService.refetch(albumId).subscribe(
      (response: Album) => this.restorePieces(response)
    );
  }

  updateAlbumTitle(id, title) {
    this.musicService.updateAlbumTitle(id, title).subscribe(
      (msg) => console.log(msg)
    );
  }

  ngOnInit() {
  }

}
