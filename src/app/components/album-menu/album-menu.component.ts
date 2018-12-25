import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../classes/Album';
import {environment} from '../../../environments/environment';
import {DialogPiecesComponent} from '../../dialogs/dialog-pieces/dialog-pieces.component';
import {MusicService} from '../../services/music.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrls: ['./album-menu.component.scss']
})
export class AlbumMenuComponent implements OnInit {

  @Input() album: Album;
  musicAlbumUrl = 'http://localhost:8010/album/';
  freedbUrl = environment.freedbUrl;
  musicbrainzUrl = environment.musicbrainz;
  amazonUrl = environment.amazonUrl;
  menus = [
    {
      label: 'Cuesheets maker',
      action: 'edit_pieces',
      icon: 'edit',
      color: 'blue',
    },
    {
      label: 'Bewerk met tag-editor',
      action: 'tag_edit',
      icon: 'edit',
      color: 'brown',
    },
    {
      label: 'Open in \'music\'',
      action: 'open_music',
      icon: 'queue_music',
      color: '',
    },
    {
      label: 'Toon in Finder',
      action: 'open_finder',
      icon: 'open_in_browser',
      color: '',
    },
    {
      label: 'Herlaad muziekstukken',
      action: 'refetch',
      icon: 'replay',
      color: '',
    },
    {
      label: 'Afbeelding inplakken',
      action: 'paste_image',
      icon: 'image',
      color: '',
    },
  ];


  constructor(
    private musicService: MusicService,
    private dialog: MatDialog,
  ) { }

  addToMenus(album: Album) {
    if (album.website) {
      this.menus.push({
        label: 'Naar website',
        action: 'website',
        icon: 'web',
        color: '',
      });
    }
    if (album.discid) {
      this.menus.push({
        label: 'MusicBrainz',
        action: 'openmusicbranz',
        icon: 'library_music',
        color: '#8f407a'
      });
      this.menus.push({
        label: 'freeDB',
        action: 'openfreedb',
        icon: 'library_music',
        color: '#395499'
      });
    }
    if (album.asin) {
      this.menus.push({
        label: 'Amazon',
        action: 'openamazon',
        icon: 'music_video',
        color: 'orange'
      });
    }
  }

  action(name) {
    switch (name) {
      case 'edit_pieces':
        this.editPieces();
        break;
      case 'tag_edit':
        this.tagedit();
        break;
      case 'open_music':
        this.openMusic();
        break;
      case 'open_finder':
        this.openFinder();
        break;
      case 'refetch':
        this.refetch();
        break;
      case 'website':
        this.website();
        break;
      case 'paste_image':
        this.pasteAlbumImage();
        break;
      case 'openmusicbrainz':
        this.openmusicbrainz();
        break;
      case 'openfreedb':
        this.openfreedb();
        break;
      case 'openamazon':
        this.openamazon();
        break;
    }
  }

  openfreedb() {
    window.open(this.freedbUrl + this.album.discid);
  }

  openmusicbrainz() {
    window.open(this.musicbrainzUrl + this.album.discid);
  }

  openamazon() {
    window.open(this.amazonUrl + this.album.asin);
  }

  openFinder() {
    this.musicService.openFinder(this.album.ID).subscribe(
      () => {},
      error => console.error(error)
    );
  }

  editPieces() {
    this.dialog.open(DialogPiecesComponent, {
      // width: '99%',
      data: {
        pieces: this.album.pieces,
        albumId: this.album.ID,
        album: this.album
      }
    });
  }

  openMusic() {
    window.open(this.musicAlbumUrl + this.album.ID, 'music');
  }

  restorePieces(album: Album) {
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  tagedit() {
    this.musicService.tagEditor(this.album.Path).subscribe();
  }

  refetch() {
    this.musicService.refetch(this.album.ID).subscribe(
      (response: Album) => this.restorePieces(response)
    );
  }

  website() {
    this.musicService.openwebsite(this.album.ID)
      .subscribe();
  }

  pasteAlbumImage() {
    this.musicService.pasteAlbumImage(this.album.ID).subscribe();
  }

  ngOnInit() {
    if (this.album) {
      this.addToMenus(this.album);
    }
  }

}
