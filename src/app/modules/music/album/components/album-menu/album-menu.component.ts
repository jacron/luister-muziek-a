import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {MusicService} from '../../../services/music.service';
import {MenuOption} from '../../../../../classes/shared/MenuOption';
import {environment} from '../../../../../../environments/environment';
import {DialogSettingsComponent} from '../../dialogs/dialog-settings/dialog-settings.component';
import {MatDialog} from '@angular/material';
import {DialogAlbumComponent} from '../../dialogs/dialog-album/dialog-album.component';
import {StateService} from '../../../../../services/state.service';
import {DialogAddComponent} from '../../../chips/dialogs/dialog-add/dialog-add.component';
import {DialogPiecesComponent} from '../../dialogs/dialog-pieces/dialog-pieces.component';

@Component({
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrls: ['./album-menu.component.scss']
})
export class AlbumMenuComponent implements OnInit {
  @Input() album: Album;
  @Output() reload = new EventEmitter();
  @Output() updateimage = new EventEmitter();

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
      label: 'Wijzig titel',
      action: this.editAlbum.bind(this),
      icon: 'edit',
      color: '',
    },
    {
      label: 'Albumgegevens',
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
    },
    {
      name: 'website',
      label: 'Naar website',
      action: this.website.bind(this),
      icon: 'web',
      color: '',
      hide: true,
    },
    {
      name: 'discid-divider',
      label: 'divider',
      icon: '',
      hide: true,
    },
    {
      name: 'musicbrainz',
      label: 'MusicBrainz',
      action: this.openmusicbrainz.bind(this),
      icon: 'library_music',
      color: '#8f407a',
      hide: true,
    },
    {
      name: 'freedb',
      label: 'freeDB',
      action: this.openfreedb.bind(this),
      icon: 'library_music',
      color: '#395499',
      hide: true,
    },
    {
      name: 'amazon',
      label: 'Amazon',
      action: this.openamazon.bind(this),
      icon: 'music_video',
      color: 'orange',
      hide: true,
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'Opties',
      action: this.options.bind(this),
      icon: 'settings',
      color: '',
    },
  ];

  constructor(
    private musicService: MusicService,
    private dialog: MatDialog,
    private stateService: StateService,
  ) {
  }

  private unhide(name) {
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].name === name) {
        this.menus[i].hide = false;
      }
    }
  }

  private addToMenus(album: Album) {
    if (album.website) {
      this.unhide('website');
    }
    if (album.discid || album.asin || album.ASIN) {
      this.unhide('discid-divider');
    }
    if (album.discid) {
      this.unhide('musicbrainz');
      this.unhide('freedb');
    }
    if (album.asin || album.ASIN) {
      this.unhide('amazon');
    }
  }

  private searchGoogle() {
    window.open(environment.googleUrl + this.album.Title);
  }

  private options() {
    this.dialog.open(DialogSettingsComponent);
  }

  private openamazon() {
    window.open(environment.amazonUrl + this.album.asin || this.album.ASIN);
  }

  private afterPasteImage(result) {
    // console.log(result);
    if (result.status == 200) {
      // this.updateimage.emit(result.imagePath);
      // this.album.
    }
  }

  private pasteAlbumImage() {
    this.musicService.pasteAlbumImage(this.album.ID).subscribe(
      result => this.afterPasteImage(result)
    );
  }

  private afterEditAlbum(result) {
    if (result) {
      this.album.Title = result.title;
      this.album.Description = result.description;
      this.album.ASIN = result.ASIN;
      this.stateService.setTitle(result.title);
    }
  }

  private editAlbum() {
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

  private editChips() {
    this.dialog.open(DialogAddComponent, {
      data: {
        album: this.album
      }
    });
  }

  private editPieces() {
    const dialogRef = this.dialog.open(DialogPiecesComponent, {
      data: {
        pieces: this.album.pieces,
        albumId: this.album.ID,
        album: this.album
      }
    });
    dialogRef.afterClosed().subscribe(
      // result => {
      // console.log(result);
      // todo: remove reload - also in parent - as it messes up aliasses
      // if (result == 'reload') {
      //   this.reload.emit(result);
      // }
      // }
    );
  }

  private tagedit() {
    this.musicService.tagEditor(this.album.ID).subscribe();
  }

  private openFinder() {
    this.musicService.openFinder(this.album.ID).subscribe(
      () => {},
      error => console.error(error)
    );
  }

  private restorePieces(album: Album) {
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  private refetch() {
    if (window.confirm('Stukken herladen? Aliassen gaan verloren!')) {
      this.musicService.refetch(this.album.ID).subscribe(
        (response: Album) => this.restorePieces(response)
      );
    }
  }

  private openMusic() {
    window.open('http://localhost:8010/album/' + this.album.ID, 'music');
  }

  private afterDelete() {
    alert(this.album.Title + ' is verwijderd');
  }

  private delete() {
    if (confirm(this.album.Title + ' verwijderen?')) {
      this.musicService.removeAlbum(this.album.ID).subscribe(
        () => this.afterDelete());
    }
  }

  private website() {
    this.musicService.openwebsite(this.album.ID)
      .subscribe();
  }

  private openmusicbrainz() {
    window.open(environment.musicbrainz + this.album.discid);
  }

  private openfreedb() {
    window.open(environment.freedbUrl + this.album.discid);
  }

  action(f: Function) {
    f();
  }

  ngOnInit() {
    if (this.album) {
      this.addToMenus(this.album);
    }
  }

}
