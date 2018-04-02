import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {MusicService} from '../music.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {StorageService} from '../storage.service';
import {Album} from '../classes/Album';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [MatToolbarModule, MatIconModule, MatMenuModule,
        HttpClientModule, RouterTestingModule.withRoutes([]),
      MatDialogModule],
      providers: [MusicService, StorageService, {
        provide: Album,
        useValue: {
          website: 'urrl'
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
