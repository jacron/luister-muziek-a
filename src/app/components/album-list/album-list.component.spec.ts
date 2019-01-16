import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListComponent } from './album-list.component';
import {MatModule} from '../../modules/mat/mat.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MockData} from '../../../test-helpers/mock-data';
import {StorageService} from '../../services/storage.service';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: StorageService,
          useClass: MockData
        }
      ],
      declarations: [ AlbumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
