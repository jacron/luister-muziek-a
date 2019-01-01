import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogAddComponent} from './dialog-add.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TypedNamePipe} from '../../../../pipes/typed-name.pipe';
import {MatAutocompleteModule, MatDialogRef, MatIconModule, MatMenuModule} from '@angular/material';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MusicService} from '../../../../shared/services/music.service';
import {HttpClientModule} from '@angular/common/http';
import {PersonService} from '../../../../services/person.service';
// import {ToolbarComponent} from '../toolbar/toolbar.component';

describe('DialogAddComponent', () => {
  let component: DialogAddComponent;
  let fixture: ComponentFixture<DialogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, HttpClientModule, MatDialogModule,
        MatMenuModule, MatIconModule],
      providers: [TypedNamePipe, MusicService, PersonService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      declarations: [DialogAddComponent, TypedNamePipe],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
