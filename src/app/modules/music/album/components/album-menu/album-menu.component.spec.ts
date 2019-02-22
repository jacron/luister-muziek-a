import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMenuComponent } from './album-menu.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatModule} from '../../../../mat/mat.module';
import {MusicService} from '../../../services/music.service';
import {MockData} from '../../../../../../test-helpers/mock-data';
import {StorageService} from '../../../../../services/storage.service';
import {ChoiceService} from '../../../services/choice.service';

describe('AlbumMenuComponent', () => {
  let component: AlbumMenuComponent;
  let fixture: ComponentFixture<AlbumMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
      ],
      declarations: [ AlbumMenuComponent ],
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
    fixture = TestBed.createComponent(AlbumMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
