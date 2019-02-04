import { TestBed } from '@angular/core/testing';

import { AlbumMenuAmazonService } from './album-menu-amazon.service';

describe('AlbumMenuAmazonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuAmazonService = TestBed.get(AlbumMenuAmazonService);
    expect(service).toBeTruthy();
  });
});
