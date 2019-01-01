import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPiecesComponent } from './dialog-pieces.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../../../services/music.service';
import {HttpClientModule} from '@angular/common/http';
import {PieceService} from '../../services/piece.service';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('DialogPiecesComponent', () => {
  let component: DialogPiecesComponent;
  let fixture: ComponentFixture<DialogPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPiecesComponent ],
      imports: [HttpClientModule, MatDialogModule],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [MusicService, PieceService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
