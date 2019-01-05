import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Renderer2,
  SimpleChanges,
} from '@angular/core';
import {Album} from '../../classes/Album';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MusicService} from '../../services/music.service';
import {StorageService} from '../../services/storage.service';
import {List} from '../../classes/List';
import {Piece} from '../../classes/Piece';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() albums: Album[];
  @Input() q = '';

  imgUrl = environment.apiServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';
  filteredAlbums: Album[];
  globalListenScrollFunc: Function;
  globalListenTouchmoveFunc: Function;
  globalListenResizeFunc: Function;

  constructor(
    private router: Router,
    private musicService: MusicService,
    private storage: StorageService,
    private renderer: Renderer2,
  ) { }

  testInAlbum(album: Album, q) {
    const s = album.Title.toLowerCase();
    if (s.indexOf(q) !== -1) { return true; }
    if (album.pieces) {
      const filteredPieces: Piece[] = [];
      for (let i = 0; i < album.pieces.length; i++) {
        const piece = album.pieces[i];
        if (piece.Name.toLowerCase().indexOf(q) !== -1) {
          filteredPieces.push(piece);
        }
      }
      if (filteredPieces.length) {
        album.filteredPieces = filteredPieces;
        return true;
      }
    }
    return false;
  }

  getIds() {
    const ids = [];
    this.filteredAlbums.forEach(album => ids.push(album.ID));
    return ids;
  }

  storeIds(newValue) {
    const list: List = this.storage.retrieveList();
    list.albumIds = this.getIds();
    list.query = newValue;
    this.storage.storeList(list);
  }

  search(newValue: string) {
    if (!newValue.length) {
      this.filteredAlbums = this.albums.slice();
      return;
    }
    const q = newValue.toLowerCase();
    this.filteredAlbums = this.albums.filter(
      album => this.testInAlbum(album, q)
    );
    this.storeIds(newValue);
  }

  toAlbum(id) {
    this.router.navigate(['/album', id]).then(() => {
    });
  }

  cleanLazy() {
    const that = this;
    this.lazyImages = Array.prototype.filter.call(this.lazyImages, function (l) {
      return l.getAttribute(that.lazyAttribute);
    });
  }

  augment_album(album: Album) {
    album.ID = +album.ID;
    for (let i = 0; i < this.albums.length; i++) {
      const a = this.albums[i];
      if (this.albums[i].ID === album.ID) {
        a.album_performers = album.album_performers;
        a.album_componisten = album.album_componisten;
        a.album_tags = album.album_tags;
        a.pieces = album.pieces;
        a.cuesheets = album.cuesheets;
        a.album_instrument = album.album_instrument;
        break;
      }
    }
  }

  elementInViewport(el) {
    const rect = el.getBoundingClientRect(),
      height = (window.innerHeight || document.documentElement.clientHeight),
      width = (window.innerWidth || document.documentElement.clientWidth),
      diff = 10;
    // console.log(rect);
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top - diff <= height &&
      rect.left <= width
    );
  }

  lazyLoad() {
    const that = this;
    // console.log('in lazyload');
    if (!this.lazyImages) {
      return;
    }
    this.lazyImages.forEach((image) => {
      if (that.elementInViewport(image)) {
        const dataSrc = image.getAttribute(that.lazyAttribute);
        if (dataSrc) {
          // that.musicService.getAlbumById(image.getAttribute('albumid')).subscribe(
          //   (album: Album) => that.augment_album(album)
          // );
          image.src = dataSrc;
          image.removeAttribute(that.lazyAttribute);
        }
      }
    });
    this.cleanLazy();
  }

  setLazy() {
    this.lazyImages = document.querySelectorAll('.lazy');
  }

  lazy() {
    this.setLazy();
    this.lazyLoad();
  }

  onChangedAlbums(albums: Album[]) {
    if (Array.isArray(albums)) {
      this.filteredAlbums = albums.slice();
      setTimeout(() => {
        this.setLazy();
        this.lazyLoad();
      }, 100);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.albums) {
      this.onChangedAlbums(changes.albums.currentValue);
    }
  }

  ngOnDestroy() {
    // this.globalListenScrollFunc();
    // this.globalListenTouchmoveFunc();
    // this.globalListenResizeFunc();
  }

  ngOnInit() {
    // console.log(this.albums);
    // this.globalListenScrollFunc = this.renderer.listen(
    //   'document', 'scroll', () =>
    //     this.lazyLoad()
    //   );
    // this.globalListenTouchmoveFunc = this.renderer.listen(
    //   'document', 'touchmove', () =>
    //     this.lazyLoad()
    // );
    // this.globalListenResizeFunc = this.renderer.listen(
    //   'window', 'resize', () =>
    //     this.lazyLoad()
    // );
  }

}
