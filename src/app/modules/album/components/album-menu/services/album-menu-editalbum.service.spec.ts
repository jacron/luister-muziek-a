import { TestBed } from '@angular/core/testing';

import { AlbumMenuEditalbumService } from './album-menu-editalbum.service';

describe('AlbumMenuEditalbumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuEditalbumService = TestBed.get(AlbumMenuEditalbumService);
    expect(service).toBeTruthy();
  });
});
