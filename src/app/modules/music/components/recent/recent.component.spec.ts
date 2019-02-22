import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentComponent } from './recent.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../../../test-helpers/mock-data';
import {StorageService} from '../../../../services/storage.service';

describe('RecentComponent', () => {
  let component: RecentComponent;
  let fixture: ComponentFixture<RecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentComponent ],
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
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
