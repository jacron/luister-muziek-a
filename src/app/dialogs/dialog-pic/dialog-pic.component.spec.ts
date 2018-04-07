import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPicComponent } from './dialog-pic.component';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MusicService} from '../../services/music.service';

describe('DialogPicComponent', () => {
  let component: DialogPicComponent;
  let fixture: ComponentFixture<DialogPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule],
      declarations: [ DialogPicComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
