import { TestBed } from '@angular/core/testing';

import { AlbumMenuMusicService } from './album-menu-music.service';

describe('AlbumMenuMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuMusicService = TestBed.get(AlbumMenuMusicService);
    expect(service).toBeTruthy();
  });
});
