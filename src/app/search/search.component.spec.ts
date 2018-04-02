import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {MatAutocompleteModule, MatDialogModule, MatIconModule} from '@angular/material';
import {TypedNamePipe} from '../typed-name.pipe';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TypedTitlePipe} from '../typed-title.pipe';
import {MusicService} from '../music.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {StorageService} from '../storage.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, TypedNamePipe, TypedTitlePipe],
      imports: [MatAutocompleteModule, MatIconModule, HttpClientModule,
        RouterTestingModule.withRoutes([]), MatDialogModule],
      providers: [TypedNamePipe, TypedTitlePipe, MusicService, StorageService],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
