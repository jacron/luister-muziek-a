import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonComponent } from './dialog-person.component';
import {MatDialogModule, MatDialogRef, MatIconModule} from '@angular/material';
import {MusicService} from '../music.service';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Person} from '../classes/Person';

describe('DialogPersonComponent', () => {
  let component: DialogPersonComponent;
  let fixture: ComponentFixture<DialogPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, HttpClientModule, MatDialogModule],
      declarations: [ DialogPersonComponent ],
      providers: [MusicService,
        {
        provide: MatDialogRef,
        useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            person: Person,
            useValue: {
              FullName: 'Jan Jansen'
            }
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
