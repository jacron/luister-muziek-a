import { TestBed } from '@angular/core/testing';

import { AlbumMenuCuesheetsmakerService } from './album-menu-cuesheetsmaker.service';

describe('AlbumMenuCuesheetsmakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumMenuCuesheetsmakerService = TestBed.get(AlbumMenuCuesheetsmakerService);
    expect(service).toBeTruthy();
  });
});
