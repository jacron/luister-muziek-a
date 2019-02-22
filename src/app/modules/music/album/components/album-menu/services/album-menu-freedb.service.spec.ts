import { TestBed } from '@angular/core/testing';

import { AlbumMenuFreedbService } from './album-menu-freedb.service';

describe('AlbumMenuFreedbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuFreedbService = TestBed.get(AlbumMenuFreedbService);
    expect(service).toBeTruthy();
  });
});
