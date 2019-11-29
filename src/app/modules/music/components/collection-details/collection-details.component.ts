import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Album} from '../../../../classes/music/Album';
import {MusicService} from '../../services/music.service';
import {StateService} from '../../../../services/state.service';
import {AlbumService} from '../../album/services/album.service';

interface CollectionResult {
  album: Album,
  albums: Album[],
}

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {
  album: Album;
  albums: Album[];
  imgSrc;
  coverSize = -1;

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private albumService: AlbumService,
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params['idcoll']) {
      this.musicService.getCollectionById(params['idcoll']).subscribe(
        (result: CollectionResult) => {
          console.log(result);
          this.openAlbum(result.album);
          this.albums = result.albums;
        },
        err => console.error(err),
        () => {}
      );
    }
  }

  updateImage() {
    // console.log(url);
    // this.imgTime = new Date();
    // this.imgUrl = this.albumImage();
  }

  reload(result) {
    console.log(result + ': in details');
    // if (result == 'reload') {
    //   this.musicService.refetch(this.album.ID).subscribe(
    //     (response: Album) => this.restorePieces(response)
    //   );
    // }
  }

  openPic(mode): void {
    const imgUrl = this.musicService.albumImageUrl(this.album.ID);  //  this.imgUrl + this.album.ID + '/album';
    const backUrl = this.musicService.albumBackImageUrl(this.album.ID);
    this.albumService.openPic({
        data: {
          imgUrl: imgUrl,
          backUrl: backUrl,
          mode: mode
        }
      }
    );
  }

  albumImage() {
    return this.musicService.albumImageUrl(this.album.ID, -1, this.coverSize);
  }

  albumBackImage() {
    return this.musicService.albumBackImageUrl(this.album.ID, 100, -1);
  }

  openAlbum(album: Album): void {
    this.album = album;
    console.log(album);
    if (album) {
      this.imgSrc = this.albumImage();
      this.stateService.setTitle(album.Title);
      document.title = album.Title;
      // if (album.cuesheets.length < 1) {
      //   this.album.expanded = true;
      // }
      // if (this.albumPiecesContainSelection(this.idpiece)) {
      //   this.album.expanded = true;
      // }
    }
  }

  ngOnInit() {
  }

}
