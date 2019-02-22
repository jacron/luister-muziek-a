import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBooksComponent } from './menu-books.component';

describe('MenuBooksComponent', () => {
  let component: MenuBooksComponent;
  let fixture: ComponentFixture<MenuBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
