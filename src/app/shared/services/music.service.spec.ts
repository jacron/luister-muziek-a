import { TestBed, inject } from '@angular/core/testing';

import { MusicService } from './music.service';
import {HttpClientModule} from '@angular/common/http';

describe('MusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([MusicService], (service: MusicService) => {
    expect(service).toBeTruthy();
  }));
});
