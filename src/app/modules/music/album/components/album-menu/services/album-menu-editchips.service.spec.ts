import { TestBed } from '@angular/core/testing';

import { AlbumMenuEditchipsService } from './album-menu-editchips.service';

describe('AlbumMenuEditchipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuEditchipsService = TestBed.get(AlbumMenuEditchipsService);
    expect(service).toBeTruthy();
  });
});
