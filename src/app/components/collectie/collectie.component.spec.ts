import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectieComponent } from './collectie.component';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../test-helpers/mock-data';
import {MockPipe} from '../../../test-helpers/mock-pipe';
import {MatModule} from '../../modules/mat/mat.module';
import {AlphabetComponent} from '../alphabet/alphabet.component';
import {CollectiesComponent} from '../collecties/collecties.component';
import {StartletterPipe} from '../../pipes/startletter.pipe';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CollectieComponent', () => {
  let component: CollectieComponent;
  let fixture: ComponentFixture<CollectieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
      ],
      declarations: [
        CollectieComponent,
        AlphabetComponent,
        CollectiesComponent,
        MockPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MusicService,
          useClass: MockData
        },
        {
          provide: StartletterPipe,
          useClass: MockData,
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
