import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
// import {MockData} from '../../../test-helpers/mock-data';
// import {StorageService} from '../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';
import {MockData} from '../../../../../test-helpers/mock-data';
import {StorageService} from '../../../../services/storage.service';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagComponent ],
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
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
