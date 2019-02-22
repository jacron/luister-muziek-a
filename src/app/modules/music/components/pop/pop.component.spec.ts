import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopComponent } from './pop.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../../../test-helpers/mock-data';
import {RouterTestingModule} from '@angular/router/testing';

describe('PopComponent', () => {
  let component: PopComponent;
  let fixture: ComponentFixture<PopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopComponent ],
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
    fixture = TestBed.createComponent(PopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
