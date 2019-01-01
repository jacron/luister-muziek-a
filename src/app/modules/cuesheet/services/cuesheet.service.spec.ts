import { TestBed, inject } from '@angular/core/testing';

import { CuesheetService } from './cuesheet.service';

describe('CuesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuesheetService]
    });
  });

  it('should be created', inject([CuesheetService], (service: CuesheetService) => {
    expect(service).toBeTruthy();
  }));
});
