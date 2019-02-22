import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopListComponent } from './pop-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../../../test-helpers/mock-data';

describe('PopListComponent', () => {
  let component: PopListComponent;
  let fixture: ComponentFixture<PopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
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
    fixture = TestBed.createComponent(PopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
