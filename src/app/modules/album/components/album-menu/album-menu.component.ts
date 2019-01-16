import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {environment} from '../../../../../environments/environment';
import {DialogPiecesComponent} from '../../dialogs/dialog-pieces/dialog-pieces.component';
import {MusicService} from '../../../../services/music.service';
import {MatDialog} from '@angular/material';
import {DialogAddComponent} from '../../../chips/dialogs/dialog-add/dialog-add.component';
import {DialogAlbumComponent} from '../../dialogs/dialog-album/dialog-album.component';
import {DialogSettingsComponent} from '../../dialogs/dialog-settings/dialog-settings.component';
// import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrls: ['./album-menu.component.scss']
})
export class AlbumMenuComponent implements OnInit {

  @Input() album: Album;
  @Output() reload = new EventEmitter();

  musicAlbumUrl = 'http://localhost:8010/album/';
  freedbUrl = environment.freedbUrl;
  musicbrainzUrl = environment.musicbrainz;
  amazonUrl = environment.amazonUrl;
  menus = [
    {
      label: 'Hernoem album',
      action: 'edit_album',
      icon: 'edit',
      color: '',
    },
    {
      label: 'Bewerk album chips',
      action: 'edit_chips',
      icon: 'edit',
      color: 'orange',
    },
    {
      label: 'Cuesheets maker',
      action: 'edit_pieces',
      icon: 'edit',
      color: 'blue',
    },
    {
      label: 'Tag-editor',
      action: 'tag_edit',
      icon: 'edit',
      color: 'brown',
    },
    {
      label: 'divider'
    },
    {
      label: 'Toon in Finder',
      action: 'open_finder',
      icon: 'open_in_browser',
      color: '#aa77ff',
    },
    {
      label: 'Herlaad muziekstukken',
      action: 'refetch',
      icon: 'replay',
      color: '#ff7733',
    },
    {
      label: 'Plak cover in',
      action: 'paste_image',
      icon: 'image',
      color: '',
    },
    {
      label: 'Open in \'music\'',
      action: 'open_music',
      icon: 'queue_music',
      color: '',
    },
    {
      label: 'Verwijder',
      action: 'delete',
      icon: 'close',
      color: 'red',
    }
  ];


  constructor(
    private musicService: MusicService,
    private dialog: MatDialog,
    // private overlayContainer: OverlayContainer,
  ) {
    // this.overlayContainer.getContainerElement().classList.add('alternate-theme');
  }

  addToMenus(album: Album) {
    if (album.website) {
      this.menus.push({
        label: 'Naar website',
        action: 'website',
        icon: 'web',
        color: '',
      });
    }
    if (album.discid || album.asin) {
      this.menus.push({
        label: 'divider',
        action: '',
        icon: '',
        color: '',
      });
    }
    if (album.discid) {
      this.menus.push({
        label: 'MusicBrainz',
        action: 'openmusicbrainz',
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
    this.menus.push({
      label: 'divider',
      action: '',
      icon: '',
      color: '',
    });
    this.menus.push({
      label: 'Opties',
      action: 'options',
      icon: 'settings',
      color: '',
    });
  }

  action(name) {
    switch (name) {
      case 'edit_album':
        this.editAlbum();
        break;
      case 'edit_chips':
        this.editChips();
        break;
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
      case 'options':
        this.options();
        break;
      case 'delete':
        this.delete();
        break;
    }
  }

  afterDelete() {
    alert(this.album.Title + ' is verwijderd');
  }

  delete() {
    if (confirm(this.album.Title + ' verwijderen?')) {
      this.musicService.removeAlbum(this.album.ID).subscribe(
        () => this.afterDelete())
    }
  }

  options() {
    this.dialog.open(DialogSettingsComponent);
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

  afterEditAlbum(result) {
    if (result) {
      this.album.Title = result.title;
      this.album.Description = result.description;
    }
  }

  editAlbum() {
    const dialogRef = this.dialog.open(DialogAlbumComponent, {
      width: '600px',
      data: {
        album: this.album
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEditAlbum(result)
    );
  }

  editChips() {
    this.dialog.open(DialogAddComponent, {
      data: {
        album: this.album
      }
    });
  }

  editPieces() {
    const dialogRef = this.dialog.open(DialogPiecesComponent, {
      data: {
        pieces: this.album.pieces,
        albumId: this.album.ID,
        album: this.album
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        // console.log(result);
        // todo: remove reload - also in parent - as it messes up aliasses
        if (result == 'reload') {
          this.reload.emit(result);
        }
      }
    )
  }

  openMusic() {
    window.open(this.musicAlbumUrl + this.album.ID, 'music');
  }

  restorePieces(album: Album) {
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  tagedit() {
    this.musicService.tagEditor(this.album.ID).subscribe();
  }

  refetch() {
    if (window.confirm('Stukken herladen? Aliassen gaan verloren!')) {
      this.musicService.refetch(this.album.ID).subscribe(
        (response: Album) => this.restorePieces(response)
      );
    }
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
