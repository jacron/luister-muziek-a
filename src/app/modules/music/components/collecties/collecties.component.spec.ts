import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiesComponent } from './collecties.component';
import {StartletterPipe} from '../../../../pipes/startletter.pipe';
import {MockPipe} from '../../../../../test-helpers/mock-pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {MatModule} from '../../../mat/mat.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

describe('CollectiesComponent', () => {
  let component: CollectiesComponent;
  let fixture: ComponentFixture<CollectiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
      ],
      declarations: [
        CollectiesComponent,
        MockPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // StartletterPipe,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
