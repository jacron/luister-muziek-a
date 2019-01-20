import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMusicComponent } from './menu-music.component';
import {MatModule} from '../../modules/mat/mat.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MenuMusicComponent', () => {
  let component: MenuMusicComponent;
  let fixture: ComponentFixture<MenuMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ MenuMusicComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
