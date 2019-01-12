import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMoviesComponent } from './menu-movies.component';

describe('MenuMoviesComponent', () => {
  let component: MenuMoviesComponent;
  let fixture: ComponentFixture<MenuMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
