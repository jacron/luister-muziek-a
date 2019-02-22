import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListComponent } from './tag-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../../../test-helpers/mock-data';
import {StorageService} from '../../../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';

describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
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
    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
