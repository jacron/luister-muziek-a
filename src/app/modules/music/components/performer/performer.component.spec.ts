import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerComponent } from './performer.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
// import {MockData} from '../../../test-helpers/mock-data';
import {RouterTestingModule} from '@angular/router/testing';
import {MockData} from '../../../../../test-helpers/mock-data';

describe('PerformerComponent', () => {
  let component: PerformerComponent;
  let fixture: ComponentFixture<PerformerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ PerformerComponent ],
      providers: [
        {
          provide: MusicService,
          useClass: MockData,
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
