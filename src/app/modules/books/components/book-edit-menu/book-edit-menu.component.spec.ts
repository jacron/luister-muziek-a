import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditMenuComponent } from './book-edit-menu.component';

describe('BookEditMenuComponent', () => {
  let component: BookEditMenuComponent;
  let fixture: ComponentFixture<BookEditMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
