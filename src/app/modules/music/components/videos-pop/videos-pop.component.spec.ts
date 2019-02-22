import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPopComponent } from './videos-pop.component';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../../../test-helpers/mock-data';
import {StorageService} from '../../../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('VideosPopComponent', () => {
  let component: VideosPopComponent;
  let fixture: ComponentFixture<VideosPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosPopComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MusicService,
          useClass: MockData,
        },
        {
          provide: StorageService,
          useClass: MockData
        },
        {
          provide: ChoiceService,
          useClass: MockData
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
