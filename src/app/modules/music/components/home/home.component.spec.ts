import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {MatModule} from '../../../mat/mat.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HomeChipsComponent} from '../../chips/components/home-chips/home-chips.component';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../../../test-helpers/mock-data';
import {StorageService} from '../../../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';
import {StateService} from '../../../../services/state.service';
import {ListService} from '../../services/list.service';
import {RouterTestingModule} from '@angular/router/testing';
import {UtilService} from '../../../../services/util.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MusicService,
          useClass: MockData
        },
        {
          provide: StorageService,
          useClass: MockData,
        },
        {
          provide: ChoiceService,
          useClass: MockData,
        },
        {
          provide: StateService,
          useClass: MockData
        },
        {
          provide: ListService,
          useClass: MockData,
        },
        {
          provide: UtilService,
          useClass: MockData,
        }
      ],
      declarations: [
        HomeComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
