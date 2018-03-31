import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MusicService} from '../music.service';
import {Person} from '../classes/Person';
import {Album} from '../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Tag} from '../classes/Tag';
import {StorageService} from '../storage.service';
import {SearchParams} from '../classes/SearchParams';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  albums: Album[];
  album: Album;

  composers: Person[];
  performers: Person[];
  collections: Album[];
  tags: Tag[];
  imgUrl = environment.apiServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';
  params: SearchParams;
  selectedComposer: Person = null;
  selectedPerformer: Person = null;
  selectedCollection: Album = null;
  selectedTag: Tag = null;

  constructor(private musicService: MusicService,
              private route: ActivatedRoute,
              private router: Router,
              private storageService: StorageService
              ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      // console.log(params);
      if (params.idcomp) {
        this.params = new SearchParams(params);
        this.storageService.storeSearchParameters(params);
        this.fetchThings(this.params);
        // this.setSelected();
      }
    }
  }

  fetchThings(params) {
    this.albums = [];
    console.log(params);
    this.musicService.getSearchedAlbums(params).subscribe(
      (albums: Album[]) => {
        this.albums = albums;
        this.storageService.storeAlbums(albums);
        // this.setSelected();
        // console.log(albums);
        setTimeout(() => {
          this.setLazy();
          this.lazyLoad();
        }, 100);
      },
      err => console.error(err),
      () => console.log('searched albums fetched')
    );
  }

  getItemById(items: any[], id: number) {
    if (!items) {
      console.log('items undefined');
      return null;
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.ID === id) {
        return item;
      }
    }
    return null;
  }

  getCollectionById(id: number): Album {
    const item = this.getItemById(this.collections, id);
    return <Album>item;
  }

  getTagById(id: number): Tag {
    const item = this.getItemById(this.tags, id);
    return <Tag>item;
  }

  getAlbumsComponist() {
    const idcomp = this.selectedComposer ? this.selectedComposer.ID : -1;
    const idperf = this.selectedPerformer ? this.selectedPerformer.ID : -1;
    const idcoll = this.selectedCollection ? this.selectedCollection.ID : -1;
    const idtag = this.selectedTag ? this.selectedTag.ID : -1;
    this.router.navigate(['/search',
      {
        idcomp: idcomp,
        idperf: idperf,
        idcoll: idcoll,
        idtag: idtag
      }
    ]).then(() => {
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
        // console.log(album);
        a.album_performers = album.album_performers;
        a.album_componisten = album.album_componisten;
        a.pieces = album.pieces;
        a.cuesheets = album.cuesheets;
        break;
      }
    }
  }

  lazyLoad() {
    const that = this;
    this.lazyImages.forEach((image) => {
      if (that.elementInViewport(image)) {
        const dataSrc = image.getAttribute(that.lazyAttribute);
        if (dataSrc) {
          that.musicService.getAlbumById(image.id).subscribe(
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

  displayNameFn(person): string {
    return person ? person.Name : person;
  }

  displayTitleFn(album): string {
    return album ? album.Title : album;
  }

  select(e) {
    e.target.select();
  }

  setComposer(person: Person) {
    this.selectedComposer = person;
    document.title = person.FullName;
  }

  setPerformer(person: Person) {
    this.selectedPerformer = person;
    if (document.title.length) { document.title += ', '; }
    document.title += person.FullName;
  }

  getComposer(id) {
    this.musicService.getComposerById(id).subscribe(
      (person: Person) => this.setComposer(person),
      (err) => console.log(err),
      () => console.log('composer fetched')
    );
  }

  getPerformer(id) {
    this.musicService.getPerformerById(id).subscribe(
      (person: Person) => this.setPerformer(person),
      (err) => console.log(err),
      () => console.log('composer fetched')
    );
  }

  setSelected() {
    console.log(this.params);
    document.title = '';
    if (this.params.idcoll !== -1) {
      this.selectedCollection = this.getCollectionById(this.params.idcoll);
      if (document.title.length) { document.title += ', '; }
      document.title += this.selectedCollection.Title;
    }
    if (this.params.idtag !== -1) {
      this.selectedTag = this.getTagById(this.params.idtag);
      if (document.title.length) { document.title += ', '; }
      document.title += this.selectedTag.Name;
    }
    const qcomposer = this.params.idcomp !== -1 ?
      this.musicService.getComposerById(this.params.idcomp) : null;
    const qperformer = this.params.idperf !== -1 ?
      this.musicService.getPerformerById(this.params.idperf) : null;
    console.log(qcomposer);
    console.log(qperformer);
    if (qcomposer && qperformer) {
      forkJoin(qcomposer, qperformer).subscribe(
        (results) => {
          this.setComposer(<Person>results[0]);
          this.setPerformer(<Person>results[1]);
          this.storageService.storeSearchTitle(document.title);
        },
        err => console.error(err),
        () => console.log('persons set')
      );
    } else if (qcomposer) {
      qcomposer.subscribe((composer: Person) => {
        this.setComposer(composer);
        this.storageService.storeSearchTitle(document.title);
      });
    } else if (qperformer) {
      qperformer.subscribe((performer: Person) => {
        this.setPerformer(performer);
        this.storageService.storeSearchTitle(document.title);
      });
    }

  }

  onSelectionChange(person) {
    if (person === 'composer') {
      this.getComposer(this.selectedComposer.ID);
    }
    if (person === 'performer') {
      this.getPerformer(this.selectedPerformer.ID);
    }
  }

  getSelection() {
    return null;
  }

  getTypeAheads() {
    const selection = this.getSelection();
    const qcomposers = this.musicService.getComposers(selection);
    const qperformers = this.musicService.getPerformers(selection);
    const qcollections = this.musicService.getCollections(selection);
    const qtags = this.musicService.getTags(selection);
    forkJoin(qcomposers, qperformers, qcollections, qtags)
      .subscribe(
        (results) => {
          this.composers = <Person[]>results[0];
          this.performers = <Person[]>results[1];
          this.collections = <Album[]>results[2];
          this.tags = <Tag[]>results[3];
        },
        err => console.error(err),
        () => {
          console.log('all three collections are fetched');
          this.setSelected();
        }
      );
  }

  ngOnInit() {
    this.getTypeAheads();
  }


}
