import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {StorageService} from '../../../../services/storage.service';
import {List} from '../../../../classes/music/List';
import {Piece} from '../../../../classes/music/Piece';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() albums: Album[];
  @Input() q = '';

  imgUrl = environment.musicServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';
  filteredAlbums: Album[];
  query;

  constructor(
    private router: Router,
    private storage: StorageService,
  ) { }

  // testInAlbum(album: Album, q) {
  //   const s = album.Title.toLowerCase();
  //   if (s.indexOf(q) !== -1) { return true; }
  //   if (album.pieces) {
  //     const filteredPieces: Piece[] = [];
  //     for (let i = 0; i < album.pieces.length; i++) {
  //       const piece = album.pieces[i];
  //       if (piece.Name.toLowerCase().indexOf(q) !== -1) {
  //         filteredPieces.push(piece);
  //       }
  //     }
  //     if (filteredPieces.length) {
  //       album.filteredPieces = filteredPieces;
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  getIds() {
    const ids = [];
    this.filteredAlbums.forEach(album => ids.push(album.ID));
    return ids;
  }

  storeIds(newValue) {
    // todo: initialize lis if null
    let list: List = this.storage.retrieveList();
    if (list) {
      list.albumIds = this.getIds();
      list.query = newValue;
      this.storage.storeList(list);
    }
  }

  albumImage(id) {
    return `${this.imgUrl}${id}/album/212/-1/`;
  }

  resetSearch() {
    this.query = null;
    this.search(null);
  }

  search(newValue: string) {
    if (!newValue || !newValue.length) {
      this.filteredAlbums = this.albums.slice();
      return;
    }
    const q = newValue.toLowerCase();
    this.filteredAlbums = this.albums.filter(
      // album => this.testInAlbum(album, q)
      (album: Album) => album.Title.toLowerCase().indexOf(q) !== -1
    );
    this.storeIds(newValue);
  }

  toAlbum(id) {
    window.open('/album/' + id, 'mc-details');
  }

  cleanLazy() {
    const that = this;
    this.lazyImages = Array.prototype.filter.call(this.lazyImages, function (l) {
      return l.getAttribute(that.lazyAttribute);
    });
  }

  elementInViewport(el) {
    const rect = el.getBoundingClientRect(),
      height = (window.innerHeight || document.documentElement.clientHeight),
      width = (window.innerWidth || document.documentElement.clientWidth),
      diff = 10;
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
      this.filteredAlbums = albums; // .slice();
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
  }

  ngOnInit() {
  }

}
