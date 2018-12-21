import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Album} from '../../classes/Album';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() albums: Album[];
  imgUrl = environment.apiServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';

  constructor(
    private router: Router,
    private musicService: MusicService,
  ) { }

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
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top - diff <= height &&
      rect.left <= width
    );
  }

  lazyLoad() {
    const that = this;
    this.lazyImages.forEach((image) => {
      if (that.elementInViewport(image)) {
        const dataSrc = image.getAttribute(that.lazyAttribute);
        if (dataSrc) {
          that.musicService.getAlbumById(image.getAttribute('albumid')).subscribe(
            (album: Album) => that.augment_album(album)
          );
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
    const that = this;
    window.onscroll = function() { that.lazyLoad(); };
    window.onresize = function() { that.lazyLoad(); };
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.lazy();
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    // const albums = changes.albums.currentValue;
    setTimeout(() => {
      this.setLazy();
      this.lazyLoad();
    }, 100);

  }

  ngOnInit() {
  }

}
