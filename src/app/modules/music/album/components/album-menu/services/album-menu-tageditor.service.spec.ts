import { TestBed } from '@angular/core/testing';

import { AlbumMenuTageditorService } from './album-menu-tageditor.service';

describe('AlbumMenuTageditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuTageditorService = TestBed.get(AlbumMenuTageditorService);
    expect(service).toBeTruthy();
  });
});
