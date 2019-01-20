import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosKlassiekComponent } from './videos-klassiek.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../test-helpers/mock-data';
import {StorageService} from '../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';

describe('VideosKlassiekComponent', () => {
  let component: VideosKlassiekComponent;
  let fixture: ComponentFixture<VideosKlassiekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosKlassiekComponent ],
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
    fixture = TestBed.createComponent(VideosKlassiekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
