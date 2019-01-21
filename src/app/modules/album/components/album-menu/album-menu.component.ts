import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {environment} from '../../../../../environments/environment';
import {DialogPiecesComponent} from '../../dialogs/dialog-pieces/dialog-pieces.component';
import {MusicService} from '../../../../services/music.service';
import {MatDialog} from '@angular/material';
import {DialogAddComponent} from '../../../chips/dialogs/dialog-add/dialog-add.component';
import {DialogAlbumComponent} from '../../dialogs/dialog-album/dialog-album.component';
import {DialogSettingsComponent} from '../../dialogs/dialog-settings/dialog-settings.component';
import {MenuOption} from '../../../../classes/shared/MenuOption';

@Component({
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrls: ['./album-menu.component.scss']
})
export class AlbumMenuComponent implements OnInit {

  @Input() album: Album;
  @Output() reload = new EventEmitter();
  @Output() updateimage = new EventEmitter();

  musicAlbumUrl = 'http://localhost:8010/album/';
  freedbUrl = environment.freedbUrl;
  musicbrainzUrl = environment.musicbrainz;
  amazonUrl = environment.amazonUrl;
  googleUrl = environment.googleUrl;

  menus: MenuOption[] = [
    {
      label: 'Google',
      action: this.searchGoogle.bind(this),
      icon: 'search',
      color: '#66bbee',
    },
    {
      label: 'Plak cover in',
      action: this.pasteAlbumImage.bind(this),
      icon: 'image',
      color: '#4477cc',
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'Hernoem album',
      action: this.editAlbum.bind(this),
      icon: 'edit',
      color: '',
    },
    {
      label: 'Bewerk album chips',
      action: this.editChips.bind(this),
      icon: 'edit',
      color: 'orange',
    },
    {
      label: 'Cuesheets maker',
      action: this.editPieces.bind(this),
      icon: 'edit',
      color: 'blue',
    },
    {
      label: 'Tag-editor',
      action: this.tagedit.bind(this),
      icon: 'edit',
      color: 'brown',
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'Toon in Finder',
      action: this.openFinder.bind(this),
      icon: 'search',
      color: '#44bbee',
    },
    {
      label: 'Herlaad muziekstukken',
      action: this.refetch.bind(this),
      icon: 'replay',
      color: '#ff7733',
    },
    {
      label: 'Open in \'music\'',
      action: this.openMusic.bind(this),
      icon: 'queue_music',
      color: '',
    },
    {
      label: 'Verwijder',
      action: this.delete.bind(this),
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
        action: this.website.bind(this),
        icon: 'web',
        color: '',
      });
    }
    if (album.discid || album.asin) {
      this.menus.push({
        label: 'divider',
        icon: '',
      });
    }
    if (album.discid) {
      this.menus.push({
        label: 'MusicBrainz',
        action: this.openmusicbrainz.bind(this),
        icon: 'library_music',
        color: '#8f407a'
      });
      this.menus.push({
        label: 'freeDB',
        action: this.openfreedb.bind(this),
        icon: 'library_music',
        color: '#395499'
      });
    }
    if (album.asin) {
      this.menus.push({
        label: 'Amazon',
        action: this.openamazon.bind(this),
        icon: 'music_video',
        color: 'orange'
      });
    }
    this.menus.push({
      label: 'divider',
      icon: '',
    });
    this.menus.push({
      label: 'Opties',
      action: this.options.bind(this),
      icon: 'settings',
      color: '',
    });
  }

  action(f: Function) {
    f();
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

  searchGoogle() {
    window.open(this.googleUrl + this.album.Title);
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

  private afterPasteImage(result) {
    // console.log(result);
    if (result.status == 200) {
      this.updateimage.emit(result.imagePath);
    }
  }

  pasteAlbumImage() {
    this.musicService.pasteAlbumImage(this.album.ID).subscribe(
      result => this.afterPasteImage(result)
    );
  }

  ngOnInit() {
    if (this.album) {
      this.addToMenus(this.album);
    }
  }

}
