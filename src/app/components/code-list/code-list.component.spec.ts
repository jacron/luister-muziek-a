import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeListComponent } from './code-list.component';
import {MatModule} from '../../modules/mat/mat.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {MockData} from '../../../test-helpers/mock-data';
import {MusicService} from '../../services/music.service';

describe('CodeListComponent', () => {
  let component: CodeListComponent;
  let fixture: ComponentFixture<CodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
        FormsModule,  // needed for ngModel
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: MusicService,
          useClass: MockData
        }
      ],
      declarations: [ CodeListComponent ]
    })
      .compileComponents().then();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
