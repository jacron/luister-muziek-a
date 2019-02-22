import { TestBed } from '@angular/core/testing';

import { AlbumMenuRefetchService } from './album-menu-refetch.service';

describe('AlbumMenuRefetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuRefetchService = TestBed.get(AlbumMenuRefetchService);
    expect(service).toBeTruthy();
  });
});
