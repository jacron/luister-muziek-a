import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomizeSearchComponent } from './dialog-customize-search.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatModule} from '../../modules/mat/mat.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MockData} from '../../../test-helpers/mock-data';

describe('DialogCustomizeSearchComponent', () => {
  let component: DialogCustomizeSearchComponent;
  let fixture: ComponentFixture<DialogCustomizeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
      ],
      declarations: [
        DialogCustomizeSearchComponent,
        // MockMatData,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useClass: MockData
        },
        {
          provide: MatDialogRef,
          useClass: MockData
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomizeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
