import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatModule} from '../../modules/mat/mat.module';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../test-helpers/mock-data';
import {StorageService} from '../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
        BrowserAnimationsModule,
      ],
      declarations: [ SearchFormComponent ],
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
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
