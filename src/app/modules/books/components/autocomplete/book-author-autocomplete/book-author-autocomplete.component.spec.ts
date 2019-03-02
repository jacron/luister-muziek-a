import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAuthorAutocompleteComponent } from './book-author-autocomplete.component';

describe('BookAuthorAutocompleteComponent', () => {
  let component: BookAuthorAutocompleteComponent;
  let fixture: ComponentFixture<BookAuthorAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAuthorAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAuthorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
