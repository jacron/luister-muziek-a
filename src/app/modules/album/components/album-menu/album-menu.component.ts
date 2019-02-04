import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {MusicService} from '../../../../services/music.service';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {AlbumMenuOptionsService} from './services/album-menu-options.service';
import {AlbumMenuAmazonService} from './services/album-menu-amazon.service';
import {AlbumMenuBrainzService} from './services/album-menu-brainz.service';
import {AlbumMenuFreedbService} from './services/album-menu-freedb.service';
import {AlbumMenuWebsiteService} from './services/album-menu-website.service';
import {AlbumMenuDeleteService} from './services/album-menu-delete.service';
import {AlbumMenuMusicService} from './services/album-menu-music.service';
import {AlbumMenuRefetchService} from './services/album-menu-refetch.service';
import {AlbumMenuFinderService} from './services/album-menu-finder.service';
import {AlbumMenuTageditorService} from './services/album-menu-tageditor.service';
import {AlbumMenuCuesheetsmakerService} from './services/album-menu-cuesheetsmaker.service';
import {AlbumMenuEditchipsService} from './services/album-menu-editchips.service';
import {AlbumMenuEditalbumService} from './services/album-menu-editalbum.service';
import {AlbumMenuPastecoverService} from './services/album-menu-pastecover.service';
import {AlbumMenuGoogleService} from './services/album-menu-google.service';

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
  ];

  menuDivider = {
    label: 'divider',
    icon: '',
  };

  constructor(
    private musicService: MusicService,
    private albumMenuOptionsService: AlbumMenuOptionsService,
    private albumMenuAmazonService: AlbumMenuAmazonService,
    private albumMenuBrainzService: AlbumMenuBrainzService,
    private albumMenuFreedbService: AlbumMenuFreedbService,
    private albumMenuWebsiteService: AlbumMenuWebsiteService,
    private albumMenuDeleteService: AlbumMenuDeleteService,
    private albumMenuMusicService: AlbumMenuMusicService,
    private albumMenuRefetchService: AlbumMenuRefetchService,
    private albumMenuFinderService: AlbumMenuFinderService,
    private albumMenuTageditorService: AlbumMenuTageditorService,
    private albumMenuCuesheetsmakerService: AlbumMenuCuesheetsmakerService,
    private albumMenuEditchipsService: AlbumMenuEditchipsService,
    private albumMenuEditalbumService: AlbumMenuEditalbumService,
    private albumMenuPastecoverService: AlbumMenuPastecoverService,
    private albumMenuGoogleService: AlbumMenuGoogleService,
  ) {
  }

  addToMenus(album: Album) {
    this.menus.push(this.albumMenuGoogleService.menu(album));
    this.menus.push(this.albumMenuPastecoverService.menu(album));
    this.menus.push(this.menuDivider);
    this.menus.push(this.albumMenuEditalbumService.menu2(album));
    this.menus.push(this.albumMenuEditchipsService.menu2(album));
    this.menus.push(this.albumMenuCuesheetsmakerService.menu(album));
    this.menus.push(this.albumMenuTageditorService.menu(album));
    this.menus.push(this.menuDivider);
    this.menus.push(this.albumMenuFinderService.menu(album));
    this.menus.push(this.albumMenuRefetchService.menu(album));
    this.menus.push(this.albumMenuMusicService.menu(album));
    this.menus.push(this.albumMenuDeleteService.menu(album));
    if (album.website) {
      this.menus.push(this.albumMenuWebsiteService.menu(album));
    }
    if (album.discid || album.asin || album.ASIN) {
      this.menus.push(this.menuDivider);
    }
    if (album.discid) {
      this.menus.push(this.albumMenuBrainzService.menu2(album));
      this.menus.push(this.albumMenuFreedbService.menu(album));
    }
    if (album.asin || album.ASIN) {
      this.menus.push(this.albumMenuAmazonService.menu(album));
    }
    this.menus.push(this.menuDivider);
    this.menus.push(this.albumMenuOptionsService.menu());
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
