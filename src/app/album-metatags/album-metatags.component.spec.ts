import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMetatagsComponent } from './album-metatags.component';
import {MusicService} from '../music.service';
import {HttpClientModule} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {Album} from '../classes/Album';

describe('AlbumMetatagsComponent', () => {
  let component: AlbumMetatagsComponent;
  let fixture: ComponentFixture<AlbumMetatagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatIconModule],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ AlbumMetatagsComponent,],
      providers: [MusicService,
        {
          provide: Album,
          useValue: {
            album_metatags: []
          }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumMetatagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
