import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeComponent } from './code.component';
import {MusicService} from '../../services/music.service';
import {MockData} from '../../../test-helpers/mock-data';
import {StateService} from '../../services/state.service';
// import {of} from 'rxjs';
// import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatModule} from '../../modules/mat/mat.module';

describe('CodeComponent', () => {
  let component: CodeComponent;
  let fixture: ComponentFixture<CodeComponent>;
  // let mockMusicService;
  // const codes = [
  //   {
  //     Code: '123',
  //     Description: 'eentweedrie',
  //   },
  // ];

  beforeEach(async(() => {
    // mockMusicService = jasmine.createSpyObj(['getCodes']);

    TestBed.configureTestingModule({
      imports: [
        MatModule,
      ],
      providers: [
        {
          provide: MusicService,
          useClass: MockData
        },
        {
          provide: StateService,
          useClass: MockData
        },
      ],
      declarations: [ CodeComponent ]
    })
    .compileComponents().then();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it ('should set code correctly from the service', () => {
  //   mockMusicService.getCodes.and.returnValue(of(codes));
  //   // fixture.detectChanges();
  //
  //   expect(fixture.componentInstance.codes.length).toBe(1);
  // })
});
