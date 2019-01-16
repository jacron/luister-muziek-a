import { TestBed } from '@angular/core/testing';

import { LcsService } from './lcs.service';

describe('LcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LcsService = TestBed.get(LcsService);
    expect(service).toBeTruthy();
  });
  it('should deliver the least common subsequence', () => {
    const service: LcsService = TestBed.get(LcsService);
    const lines = [
      'music at your ears: 1. allegro',
      'music at your ears: 2. adagio',
      'music at your ears: 3. allegretto',
    ];
    const lcs = service.lcs(lines);
    expect(lcs).toEqual('music at your ears: ');
  });
  it('should deliver the length of the l.c.s. plus the length of ' +
    'preceding mumeric part', () => {
    const service: LcsService = TestBed.get(LcsService);
    const lines = [
      '1 music at your ears: 1. allegro',
      '2 music at your ears: 2. adagio',
      '3 music at your ears: 3. allegretto',
    ];
    const lcs2 = service.lcs2(lines);
    expect(lcs2).toEqual('music at your ears: '.length + 1);

  });
});
