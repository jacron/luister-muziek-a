import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumThumbComponent } from './album-thumb.component';
import {AlbumPersonsComponent} from '../album-persons/album-persons.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../music.service';
import {HttpClientModule} from '@angular/common/http';

describe('AlbumThumbComponent', () => {
  let component: AlbumThumbComponent;
  let fixture: ComponentFixture<AlbumThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumThumbComponent ],
      imports: [HttpClientModule],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [AlbumPersonsComponent, MusicService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
