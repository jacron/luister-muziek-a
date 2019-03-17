import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditCardComponent } from './book-edit-card.component';

describe('BookEditCardComponent', () => {
  let component: BookEditCardComponent;
  let fixture: ComponentFixture<BookEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
