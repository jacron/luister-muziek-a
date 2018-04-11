import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuesheetMenuComponent } from './cuesheet-menu.component';
import {MatIconModule, MatMenuModule} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MusicService} from '../../services/music.service';

describe('CuesheetMenuComponent', () => {
  let component: CuesheetMenuComponent;
  let fixture: ComponentFixture<CuesheetMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuesheetMenuComponent ],
      imports: [ MatIconModule, MatMenuModule, HttpClientModule ],
      providers: [MusicService],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuesheetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
