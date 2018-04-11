import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPiecesComponent } from './album-pieces.component';
import {MatIconModule} from '@angular/material';
import {MusicService} from '../../services/music.service';
import {HttpClientModule} from '@angular/common/http';
import {PieceService} from '../../services/piece.service';

describe('AlbumPiecesComponent', () => {
  let component: AlbumPiecesComponent;
  let fixture: ComponentFixture<AlbumPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPiecesComponent ],
      imports: [MatIconModule, HttpClientModule],
      providers: [MusicService, PieceService]
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
