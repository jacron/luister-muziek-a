import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailsComponent } from './album-details.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../../services/music.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material';

describe('AlbumDetailsComponent', () => {
  let component: AlbumDetailsComponent;
  let fixture: ComponentFixture<AlbumDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumDetailsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientModule,
      MatDialogModule],
      providers: [ToolbarComponent, MusicService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
