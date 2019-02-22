import { TestBed } from '@angular/core/testing';

import { AlbumMenuFinderService } from './album-menu-finder.service';

describe('AlbumMenuFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuFinderService = TestBed.get(AlbumMenuFinderService);
    expect(service).toBeTruthy();
  });
});
