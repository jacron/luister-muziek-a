import { TestBed, inject } from '@angular/core/testing';

import { PieceService } from './piece.service';
import {MusicService} from './music.service';
import {HttpClientModule} from '@angular/common/http';

describe('PieceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PieceService, MusicService]
    });
  });

  it('should be created', inject([PieceService], (service: PieceService) => {
    expect(service).toBeTruthy();
  }));
});
