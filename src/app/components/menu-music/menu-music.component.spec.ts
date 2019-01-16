import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMusicComponent } from './menu-music.component';
import {MatModule} from '../../modules/mat/mat.module';

describe('MenuMusicComponent', () => {
  let component: MenuMusicComponent;
  let fixture: ComponentFixture<MenuMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule
      ],
      declarations: [ MenuMusicComponent ]
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
