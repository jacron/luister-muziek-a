import { TestBed } from '@angular/core/testing';

import { AlbumMenuWebsiteService } from './album-menu-website.service';

describe('AlbumMenuWebsiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuWebsiteService = TestBed.get(AlbumMenuWebsiteService);
    expect(service).toBeTruthy();
  });
});
