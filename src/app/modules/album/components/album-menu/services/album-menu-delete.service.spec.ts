import { TestBed } from '@angular/core/testing';

import { AlbumMenuDeleteService } from './album-menu-delete.service';

describe('AlbumMenuDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuDeleteService = TestBed.get(AlbumMenuDeleteService);
    expect(service).toBeTruthy();
  });
});
