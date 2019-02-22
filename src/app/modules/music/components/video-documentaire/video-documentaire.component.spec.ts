import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDocumentaireComponent } from './video-documentaire.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
// import {MockData} from '../../../test-helpers/mock-data';
// import {StorageService} from '../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';
import {MockData} from '../../../../../test-helpers/mock-data';
import {StorageService} from '../../../../services/storage.service';

describe('VideoDocumentaireComponent', () => {
  let component: VideoDocumentaireComponent;
  let fixture: ComponentFixture<VideoDocumentaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDocumentaireComponent ],
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
    fixture = TestBed.createComponent(VideoDocumentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
