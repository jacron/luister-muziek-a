import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponistComponent } from './componist.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../../../test-helpers/mock-data';

describe('ComponistComponent', () => {
  let component: ComponistComponent;
  let fixture: ComponentFixture<ComponistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponistComponent ],
      providers: [
        {
          provide: MusicService,
          useClass: MockData
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
