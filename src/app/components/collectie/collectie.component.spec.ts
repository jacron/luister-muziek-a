import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectieComponent } from './collectie.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../test-helpers/mock-data';
import {MatModule} from '../../modules/mat/mat.module';
import {AlphabetComponent} from '../alphabet/alphabet.component';
import {CollectiesComponent} from '../collecties/collecties.component';
import {StartletterPipe} from '../../pipes/startletter.pipe';

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
      ],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MusicService,
          useClass: MockData
        },
        StartletterPipe
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
