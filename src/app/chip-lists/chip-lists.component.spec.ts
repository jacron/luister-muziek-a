import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListsComponent } from './chip-lists.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import { MatDialogModule} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MusicService} from '../music.service';
import {HttpClientModule} from '@angular/common/http';
import {Album} from '../classes/Album';
import any = jasmine.any;
import {Person} from '../classes/Person';

describe('ChipListsComponent', () => {
  let component: ChipListsComponent;
  let fixture: ComponentFixture<ChipListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), MatChipsModule,
        MatIconModule, MatDialogModule, HttpClientModule],
      declarations: [ ChipListsComponent,  ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ MusicService,
        {
          provide: Album,
          useValue: {
            album_componistem: Person,
            useValue: []
          }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
