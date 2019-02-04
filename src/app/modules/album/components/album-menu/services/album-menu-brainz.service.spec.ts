import { TestBed } from '@angular/core/testing';

import { AlbumMenuBrainzService } from './album-menu-brainz.service';

describe('AlbumMenuBrainzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuBrainzService = TestBed.get(AlbumMenuBrainzService);
    expect(service).toBeTruthy();
  });
});
