import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCuesheetsComponent } from './album-cuesheets.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {MusicService} from '../../services/music.service';
import {MatDialogModule} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

describe('AlbumCuesheetsComponent', () => {
  let component: AlbumCuesheetsComponent;
  let fixture: ComponentFixture<AlbumCuesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), MatChipsModule,
        MatIconModule, MatDialogModule, HttpClientModule],
      declarations: [ AlbumCuesheetsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ MusicService  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCuesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
