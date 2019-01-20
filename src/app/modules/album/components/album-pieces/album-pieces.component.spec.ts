import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPiecesComponent } from './album-pieces.component';
import {MusicService} from '../../../../services/music.service';
import {HttpClientModule} from '@angular/common/http';
import {PieceService} from '../../services/piece.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatModule} from '../../../mat/mat.module';
import {UtilService} from '../../../../services/util.service';

describe('AlbumPiecesComponent', () => {
  let component: AlbumPiecesComponent;
  let fixture: ComponentFixture<AlbumPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPiecesComponent ],
      imports: [MatModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [MusicService, PieceService, UtilService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
