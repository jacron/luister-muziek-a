import { TestBed } from '@angular/core/testing';

import { AlbumMenuPastecoverService } from './album-menu-pastecover.service';

describe('AlbumMenuPastecoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuPastecoverService = TestBed.get(AlbumMenuPastecoverService);
    expect(service).toBeTruthy();
  });
});
