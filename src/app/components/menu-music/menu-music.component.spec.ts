import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMusicComponent } from './menu-music.component';

describe('MenuMusicComponent', () => {
  let component: MenuMusicComponent;
  let fixture: ComponentFixture<MenuMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
