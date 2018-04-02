import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagComponent } from './dialog-tag.component';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {MusicService} from '../music.service';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Tag} from '../classes/Tag';

describe('DialogTagComponent', () => {
  let component: DialogTagComponent;
  let fixture: ComponentFixture<DialogTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule],
      declarations: [ DialogTagComponent ],
      providers: [MusicService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            tag: Tag,
            useValue: {
              Name: 'Piet'
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
