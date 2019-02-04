import { TestBed } from '@angular/core/testing';

import { AlbumMenuOptionsService } from './album-menu-options.service';

describe('AlbumMenuOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuOptionsService = TestBed.get(AlbumMenuOptionsService);
    expect(service).toBeTruthy();
  });
});
