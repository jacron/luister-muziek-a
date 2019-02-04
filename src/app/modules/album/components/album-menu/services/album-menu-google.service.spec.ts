import { TestBed } from '@angular/core/testing';

import { AlbumMenuGoogleService } from './album-menu-google.service';

describe('AlbumMenuGoogleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuGoogleService = TestBed.get(AlbumMenuGoogleService);
    expect(service).toBeTruthy();
  });
});
