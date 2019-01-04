import { TestBed } from '@angular/core/testing';

import { LcsService } from './lcs.service';

describe('LcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LcsService = TestBed.get(LcsService);
    expect(service).toBeTruthy();
  });
});
